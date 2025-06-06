import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ResourceInterface } from "../../components/model/resourse.interface";
import { resourceDataset } from "../home/home.data";
import SetaVoltar from "../../components/seta.voltar";
import ModalAcoesAbrigo from "../../components/modal.abrigos";

type Props = {
  navigation: any;
};

export default function AbrigosScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceInterface | null>(null);

  const handlePress = (resource: ResourceInterface) => {
    navigation.navigate("Resource", { resource });
  };

  const handleMoreOptions = (resource: ResourceInterface) => {
    setSelectedResource(resource);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setModalVisible(false);
    navigation.navigate("CadastrarAbrigo");
  };

const handleDelete = async () => {
    setModalVisible(false);
    console.log("Excluindo abrigo:", selectedResource?.resourceCode);

    if (!selectedResource) return;

    try {
      const response = await axios.delete(
        `https://alerta-cidadao.azurewebsites.net/api/SafeResource${selectedResource.resourceCode}`
      );
      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Erro ao excluir o abrigo");
      }
      console.log("Abrigo excluído com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCriarAbrigo = () => {
    navigation.navigate("CadastrarAbrigo");
  };

  const renderItem = ({ item }: { item: ResourceInterface }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={styles.card}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.cod}>{item.resourceCode}</Text>
      </View>
      <TouchableOpacity onPress={() => handleMoreOptions(item)}>
        <MaterialIcons name="more-vert" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SetaVoltar />

      <Text style={styles.header}>Todos os abrigos:</Text>
      <FlatList
        data={resourceDataset}
        keyExtractor={(item) => item.resourceCode}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12 }}
      />

      <ModalAcoesAbrigo
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onPress={handleCriarAbrigo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 10,
  },
  cod: {
    fontSize: 14,
    color: "#666",
  },
});
