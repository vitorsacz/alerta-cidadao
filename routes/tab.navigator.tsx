import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PerfilScreen from "../app/pages/perfil/perfil.screen";
import CadastrarAbrigoForm from "../app/pages/resource/abrigos.form";
import HomeScreen from "../app/pages/home/home.screen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ 
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Abrigo") {
            iconName = focused ? "document" : "document-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
            backgroundColor: '#0156a7',
            borderTopColor: '#242424', 
          },
          tabBarActiveTintColor: '#FFFFFF', 
          tabBarInactiveTintColor: '#B0B0B0', 
      })
    }
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Abrigo"
        component={CadastrarAbrigoForm}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
