import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useForm, Controller, SubmitHandler, UseFormSetValue } from "react-hook-form";
import axios from "axios";
import SetaVoltar from "../../components/seta.voltar";

// --- Configurações e Constantes ---

export const URL_API_BACK = "http://10.0.2.2:8080";
const OPENCAGE_API_KEY = "270f382e18c445fa81e44540384a5d45";

// --- Definições de Tipos e Interfaces ---

// Estrutura do formulário expandida para o ViaCEP
interface ShelterForm {
  name: string;
  description: string;
  capacity: string;
  
  // Campos de endereço
  cep: string;
  street: string; // logradouro
  neighborhood: string; // bairro
  city: string; // localidade
  state: string; // uf
  streetNumber: string;
  complement: string;
}

// Payload final para a sua API backend
interface ResourcePayload {
  resourceCode: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  capacity: number;
}

// Resposta da API ViaCEP
interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean; // ViaCEP retorna 'erro: true' para CEPs inválidos
}

// Resposta da API OpenCage
interface OpenCageResponse {
  results: {
    geometry: {
      lat: number;
      lng: number;
    };
  }[];
}

// --- Funções Auxiliares de API ---

/**
 * Busca dados de endereço a partir de um CEP.
 * @param cep O CEP a ser consultado (apenas números).
 * @param setValue Função do React Hook Form para atualizar os campos.
 */
const fetchAddressFromCEP = async (
  cep: string,
  setValue: UseFormSetValue<ShelterForm>
): Promise<void> => {
  if (cep.length !== 8) {
    return; // Não faz a busca se o CEP não estiver completo
  }
  
  try {
    const { data } = await axios.get<ViaCEPResponse>(`https://viacep.com.br/ws/${cep}/json/`);

    if (data.erro) {
      Alert.alert("CEP não encontrado", "Por favor, verifique o CEP digitado.");
      return;
    }

    // Atualiza os campos do formulário com os dados do ViaCEP
    setValue("street", data.logradouro);
    setValue("neighborhood", data.bairro);
    setValue("city", data.localidade);
    setValue("state", data.uf);

  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    Alert.alert("Erro", "Não foi possível buscar o endereço a partir do CEP.");
  }
};

/**
 * Converte um endereço completo em coordenadas geográficas.
 */
const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${OPENCAGE_API_KEY}`;
  
  try {
    const { data } = await axios.get<OpenCageResponse>(url);
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry;
    }
    throw new Error("Endereço não encontrado pela API de geocodificação.");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar coordenadas: ${error.message}`);
    }
    throw new Error("Ocorreu um erro desconhecido durante a geocodificação.");
  }
};


// --- Componente Principal ---

const CadastrarAbrigoForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFetchingCep, setIsFetchingCep] = useState<boolean>(false);
  
  const {
    control,
    handleSubmit,
    reset,
    setValue, // Essencial para atualizar o formulário programaticamente
    formState: { errors },
  } = useForm<ShelterForm>({
    defaultValues: {
      name: "",
      description: "",
      capacity: "",
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      streetNumber: "",
      complement: "",
    },
  });

  const handleCepBlur = async (cep: string) => {
    setIsFetchingCep(true);
    await fetchAddressFromCEP(cep, setValue);
    setIsFetchingCep(false);
  };

  const onSubmit: SubmitHandler<ShelterForm> = async (data) => {
    setIsSubmitting(true);
    try {
      // 1. Concatena o endereço para a geocodificação
      const fullAddress = `${data.street}, ${data.streetNumber} - ${data.neighborhood}, ${data.city} - ${data.state}`;
      
      const { lat, lng } = await geocodeAddress(fullAddress);

      // 2. Monta o payload final conforme a especificação
      const payload: ResourcePayload = {
        resourceCode: `RE-${Date.now()}`, // Gera um código único simples
        name: data.name,
        description: data.description,
        latitude: lat,
        longitude: lng,
        capacity: parseInt(data.capacity, 10),
      };

      await axios.post(`${URL_API_BACK}/api/SafeResource`, payload);

      Alert.alert("Sucesso!", "Abrigo cadastrado com sucesso.");
      reset();

    } catch (error: unknown) {
      let errorMessage = "Não foi possível cadastrar o abrigo.";
      if (typeof error === 'object' && error !== null) {
        const serverMessage = (error as any).response?.data?.message;
        const genericMessage = (error as any).message;
        errorMessage = serverMessage || genericMessage || errorMessage;
      }
      
      console.error("Erro ao submeter formulário:", error);
      Alert.alert("Ocorreu um Erro", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SetaVoltar />
        <Text style={styles.title}>Cadastrar um abrigo</Text>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Dados do Abrigo */}
          <Text style={styles.label}>Nome do Abrigo</Text>
          <Controller name="name" control={control} rules={{ required: "O nome é obrigatório." }} render={({ field: { onChange, value } }) => <TextInput placeholder="Ex: Abrigo Solidário" onChangeText={onChange} value={value} style={styles.input} />} />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

          {/* Endereço com ViaCEP */}
          <Text style={styles.label}>CEP</Text>
          <View style={styles.cepContainer}>
            <Controller name="cep" control={control} rules={{ required: "O CEP é obrigatório.", minLength: { value: 8, message: 'CEP deve ter 8 dígitos'} }} render={({ field: { onChange, onBlur, value } }) => (
              <TextInput placeholder="Apenas números" onChangeText={onChange} value={value} style={styles.cepInput} keyboardType="numeric" maxLength={8} onBlur={() => handleCepBlur(value)} />
            )} />
            {isFetchingCep && <ActivityIndicator style={styles.cepLoader} color="#4267B2" />}
          </View>
          {errors.cep && <Text style={styles.errorText}>{errors.cep.message}</Text>}

          <Text style={styles.label}>Rua / Logradouro</Text>
          <Controller name="street" control={control} render={({ field: { value } }) => <TextInput style={[styles.input, styles.inputDisabled]} value={value} editable={false} />} />

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Número</Text>
              <Controller name="streetNumber" control={control} rules={{ required: "O número é obrigatório." }} render={({ field: { onChange, value } }) => <TextInput placeholder="Ex: 123" onChangeText={onChange} value={value} style={styles.input} keyboardType="numeric" />} />
              {errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber.message}</Text>}
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Complemento</Text>
              <Controller name="complement" control={control} render={({ field: { onChange, value } }) => <TextInput placeholder="Opcional" onChangeText={onChange} value={value} style={styles.input} />} />
            </View>
          </View>
          
          <Text style={styles.label}>Bairro</Text>
          <Controller name="neighborhood" control={control} render={({ field: { value } }) => <TextInput style={[styles.input, styles.inputDisabled]} value={value} editable={false} />} />
          
          <View style={styles.row}>
            <View style={{ flex: 3, marginRight: 8 }}>
              <Text style={styles.label}>Cidade</Text>
              <Controller name="city" control={control} render={({ field: { value } }) => <TextInput style={[styles.input, styles.inputDisabled]} value={value} editable={false} />} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>UF</Text>
              <Controller name="state" control={control} render={({ field: { value } }) => <TextInput style={[styles.input, styles.inputDisabled]} value={value} editable={false} />} />
            </View>
          </View>
          
          {/* Demais Informações */}
          <Text style={styles.label}>Capacidade de Pessoas</Text>
          <Controller name="capacity" control={control} rules={{ required: "A capacidade é obrigatória.", pattern: { value: /^[0-9]+$/, message: "Insira apenas números." }, }} render={({ field: { onChange, value } }) => <TextInput placeholder="Ex: 50" onChangeText={onChange} value={value} keyboardType="numeric" style={styles.input} />} />
          {errors.capacity && <Text style={styles.errorText}>{errors.capacity.message}</Text>}

          <Text style={styles.label}>Descrição</Text>
          <Controller name="description" control={control} rules={{ required: "Descreva o abrigo e suas necessidades." }} render={({ field: { onChange, value } }) => <TextInput placeholder="Itens necessários, tipo de abrigo, etc." onChangeText={onChange} value={value} multiline numberOfLines={4} style={[styles.input, styles.textArea]} />} />
          {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[styles.button, isSubmitting && styles.buttonDisabled]} disabled={isSubmitting}>
            {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Adicionar Abrigo</Text>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CadastrarAbrigoForm;


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  scrollView: { flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24, color: "#1A202C" },
  label: { fontSize: 16, fontWeight: "500", color: "#4A5568", marginBottom: 8, marginTop: 8 },
  input: { backgroundColor: "#F7FAFC", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: "#2D3748" },
  inputDisabled: { backgroundColor: "#E2E8F0", color: "#718096" },
  textArea: { height: 120, textAlignVertical: "top" },
  button: { backgroundColor: "#4267B2", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 24, marginBottom: 40 },
  buttonDisabled: { backgroundColor: "#A0AEC0" },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  errorText: { color: "#E53E3E", fontSize: 14, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', },
  col: { flex: 1, marginRight: 8 },
  cepContainer: { flexDirection: 'row', alignItems: 'center' },
  cepInput: { flex: 1, backgroundColor: "#F7FAFC", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: "#2D3748" },
  cepLoader: { marginLeft: 10 }
});