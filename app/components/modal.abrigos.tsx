// components/modal.acoes.abrigo.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  onDelete: () => void;
  onPress?: () => void;
}

export default function ModalAcoesAbrigo({ visible, onClose, onAdd, onDelete, onPress}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} onPress={onClose} />
              </View>
              <Text style={styles.title}>O que deseja fazer?</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  onAdd();
                  if (onPress) onPress();
                }}
              >
                <Text style={styles.addText}>adicionar abrigo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteText}>excluir abrigo</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 270,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
