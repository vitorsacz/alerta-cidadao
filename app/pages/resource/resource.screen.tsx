import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/root.stack.navigation";
import SetaVoltar from "../../components/seta.voltar";

type ResourceScreenRouteProp = RouteProp<RootStackParamList, "Resource">;

type Props = {
  navigation: any; 
};

export default function ResourceScreen({ navigation }: Props) {
  const route = useRoute<ResourceScreenRouteProp>();
  const { resource } = route.params;

  const handleAbrigo = () => {
    navigation.navigate("Abrigos", { resource });
  };

  const handleAbrigoForm = () => {
    navigation.navigate("CadastrarAbrigo");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SetaVoltar />
      <Text style={styles.title}>Abrigo: {resource.name}</Text>

      <Text style={styles.label}>description:</Text>
      <Text style={styles.description}>{resource.description}</Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleAbrigoForm}>
        <Text style={styles.buttonText}>Cadastrar abrigo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleAbrigo}>
        <Text style={styles.buttonText}>Abrigos cadastrados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 100,
    lineHeight: 20,
    marginTop: 30,
  },
  buttonPrimary: {
    backgroundColor: "#3F51B5",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonSecondary: {
    backgroundColor: "#2ECC71",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
