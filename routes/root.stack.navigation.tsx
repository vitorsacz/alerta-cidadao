import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./tab.navigator";
import HomeScreen from "../app/pages/home/home.screen";
import PerfilScreen from "../app/pages/perfil/perfil.screen";
import LoginScreen from "../app/pages/login/login.screen";
import CadastroScreen from "../app/pages/login/cadastro.screen";


export type RootStackParamList = {
  TabNavigation: { screen: string } | undefined;
  Home: undefined;
  Perfil: undefined;
  Login: undefined;
  Cadastro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{ headerShown: false }}
    >
        <Stack.Screen
            name="TabNavigation" component={TabNavigator}
        />
        <Stack.Screen
            name="Home" component={HomeScreen}
        />
        <Stack.Screen
            name="Perfil" component={PerfilScreen}
        />
        <Stack.Screen
            name="Login" component={LoginScreen} 
        />
        <Stack.Screen
            name="Cadastro" component={CadastroScreen}
        />

    </Stack.Navigator>
  );
}
