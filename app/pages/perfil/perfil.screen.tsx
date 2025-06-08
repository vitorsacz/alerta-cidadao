import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface ProfileScreenProps {
  navigation?: any; 
}

interface MenuItem {
  icon: keyof typeof Feather.glyphMap;
  text: string;
  onPress: () => void;
  type?: "default" | "toggle" | "danger";
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); 

  const user = {
    name: "Lorenzo Vaz",
    email: "lorenzovaz@gmail.com",
    joinedDate: "Junho de 2025",
    profileImageUrl: "https://i.pravatar.cc/150?u=lorenzovaz",
  };

  const toggleTheme = () => setIsDarkTheme((previousState) => !previousState);

  const handleLogout = () => {
    navigation?.navigate("Login");
    console.log("Usuário clicou em Sair da conta");
  };

  const menuItems: MenuItem[] = [
    {
      icon: "edit-3",
      text: "Editar Perfil",
      onPress: () => console.log("Navegar para Editar Perfil"),
    },
    {
      icon: "settings",
      text: "Configurações da Conta",
      onPress: () => console.log("Navegar para Configurações"),
    },
    {
      icon: "bell",
      text: "Notificações",
      onPress: () => console.log("Navegar para Notificações"),
    },
    {
      icon: "help-circle",
      text: "Ajuda e Suporte",
      onPress: () => console.log("Navegar para Ajuda"),
    },
    {
      icon: "file-text",
      text: "Termos de Serviço",
      onPress: () => console.log("Navegar para Termos"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.bemvindoContainer}>
          <Text style={styles.bemvindoText}>
            Bem-vindo ao seu perfil, {user.name}!
          </Text>
        </View>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.profileImageUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemContent}>
                <Feather name={item.icon} size={22} color="#4A5568" />
                <Text style={styles.menuItemText}>{item.text}</Text>
              </View>
              {item.type === "toggle" ? (
                <Switch
                  trackColor={{ false: "#E2E8F0", true: "#76E4A6" }}
                  thumbColor={isDarkTheme ? "#2F855A" : "#f4f3f4"}
                  onValueChange={toggleTheme}
                  value={isDarkTheme}
                />
              ) : (
                <Feather name="chevron-right" size={22} color="#A0AEC0" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={22} color="#E53E3E" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
    paddingTop: 20, 
  },
  bemvindoContainer: {
    padding: 16,
    backgroundColor: "#F7FAFC",
    marginTop: 30,
  },
  bemvindoText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
    alignSelf: "flex-start",
  },
  profileHeader: {
    alignItems: "center",
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#E2E8F0",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A202C",
  },
  userEmail: {
    fontSize: 16,
    color: "#718096",
    marginTop: 4,
  },
  joinedDate: {
    fontSize: 14,
    color: "#A0AEC0",
    marginTop: 8,
    fontStyle: "italic",
  },
  menuContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden", 
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2F7",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#2D3748",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7D7",
  },
  logoutButtonText: {
    color: "#C53030",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ProfileScreen;
