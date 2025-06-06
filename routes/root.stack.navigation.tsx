import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./tab.navigator";
import HomeScreen from "../app/pages/home/home.screen";
import PerfilScreen from "../app/pages/perfil/perfil.screen";
import LoginScreen from "../app/pages/login/login.screen";
import CadastroScreen from "../app/pages/login/cadastro.screen";
import RecuperarSenhaScreen from "../app/pages/login/recuperar.senha.screen";
import { ResourceInterface } from "../app/components/model/resourse.interface";
import ResourceScreen from "../app/pages/resource/resource.screen";
import AbrigosScreen from "../app/pages/resource/abrigos.screen";
import CadastrarAbrigoForm from "../app/pages/resource/abrigos.form";


export type RootStackParamList = {
  TabNavigation: { screen: string } | undefined;
  Home: undefined;
  Perfil: undefined;
  Login: undefined;
  Cadastro: undefined;
  RecuperarSenha: undefined;
  Resource: { resource: ResourceInterface };
  Abrigos: { resource: ResourceInterface };
  CadastrarAbrigo: undefined; 
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
        <Stack.Screen
            name="RecuperarSenha" component={RecuperarSenhaScreen}
        />
        <Stack.Screen
            name="Resource" component={ResourceScreen}
        />
        <Stack.Screen
            name="Abrigos" component={AbrigosScreen}
        />  
        <Stack.Screen
            name="CadastrarAbrigo" component={CadastrarAbrigoForm} 
        />

    </Stack.Navigator>
  );
}
