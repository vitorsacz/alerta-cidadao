import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { resourceDataset } from "../home/home.data";
import SetaVoltar from "../../components/seta.voltar";

interface ShelterForm {
  name: string;
  description: string;
  address: string;
  capacity: string;
}

interface Resource {
  resourceCode: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  capacity: number;
}

export default function CadastrarAbrigoForm() {
  const { control, handleSubmit, reset } = useForm<ShelterForm>();
  const [shelterCount, setShelterCount] = useState<number>(0);

  useEffect(() => {
    // Simula busca de quantidade de abrigos cadastrados
    const fetchShelterCount = async () => {
      try {
        const response = resourceDataset.length > 0 ? resourceDataset : [];
        setShelterCount(response.length);
      } catch (err) {
        console.error("Erro ao buscar abrigos:", err);
      }
    };
    fetchShelterCount();
  }, []);

  const geocodeAddress = async (
    address: string
  ): Promise<{ lat: number; lng: number }> => {
    const API_KEY = "270f382e18c445fa81e44540384a5d45"; // substitua pela sua chave
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data as {
      results: { geometry: { lat: number; lng: number } }[];
    };
    const { lat, lng } = data.results[0].geometry;
    return { lat, lng };
  };

  const onSubmit = async (data: ShelterForm) => {
    try {
      const { lat, lng } = await geocodeAddress(data.address);

      const payload: Resource = {
        resourceCode: `RE${shelterCount + 1}`,
        name: data.name,
        description: data.description,
        latitude: lat,
        longitude: lng,
        capacity: parseInt(data.capacity, 10),
      };

      await axios.post("https://alerta-cidadao.azurewebsites.net/api/SafeResource", payload);
      Alert.alert("Sucesso", "Abrigo cadastrado com sucesso!");
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar o abrigo.");
    }
  };

  return (
    <View style={styles.container}>
      <SetaVoltar />
      <Text style={styles.title}>Cadastrar um abrigo:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Endereço"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="capacity"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Capacidade"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Descrição"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar abrigo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 100, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
