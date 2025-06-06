import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { resourceDataset } from "./home.data";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/root.stack.navigation";
import { StackNavigationProp } from "@react-navigation/stack";


const API_KEY = "f42f5afe1f2ccee9f8d2677105a23818";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}


export default function HomeScreen({ navigation }: Props) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão negada",
            "Não foi possível acessar sua localização."
          );
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        const data = await response.json();

        if (data.cod !== 200) {
          throw new Error("Erro ao buscar clima: " + data.message);
        }

        setWeather(data);
      } catch (error) {
        console.error("Erro:", error);
        const errorMessage =
          error instanceof Error && error.message
            ? error.message
            : "Erro desconhecido";
        Alert.alert("Erro ao buscar clima", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={styles.primary.color} />
        <Text style={[styles.loadingText, { color: styles.primary.color }]}>
          Carregando clima...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          <Text style={styles.bold}>Bem-vindo(a) ao{"\n"}</Text>
          <Text style={styles.bold}>Alerta cidadão!</Text>
        </Text>

        <Image
          source={require("./../../../assets/banner-home.png")}
          style={styles.banner}
          resizeMode="cover"
        />

        {weather && (
          <View style={styles.weatherCard}>
            <Text style={styles.sectionTitle}>previsao do tempo</Text>
            <View style={styles.weatherRow}>
              <Text style={styles.temperature}>
                {weather.main.temp.toFixed(1)}
              </Text>
              <View style={styles.weatherDetails}>
                <Text style={styles.info}>
                  📍 <Text style={styles.infoLabel}>Local:</Text> {weather.name}
                </Text>
                <Text style={styles.info}>
                  🌤️ <Text style={styles.infoLabel}>Condição:</Text>{" "}
                  {weather.weather[0].description}
                </Text>
                <Text style={styles.info}>
                  💧 <Text style={styles.infoLabel}>Umidade:</Text>{" "}
                  {weather.main.humidity}%
                </Text>
              </View>
            </View>
          </View>
        )}

        <Text style={styles.subTitle}>Abrigos registrados:</Text>

        <View style={styles.grid}>
          {resourceDataset.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("Resource", { resource })
              }
            >
              <Text style={styles.cardText}>{resource.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PRIMARY_COLOR = "#000";
const SECONDARY_COLOR = "#f5f6fa";
const CARD_BG = "#fff";
const BORDER_COLOR = "#e0e0e0";
const SHADOW_COLOR = "#000";

const styles = StyleSheet.create({
  primary: {
    color: PRIMARY_COLOR,
  },
  safe: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: SECONDARY_COLOR,
  },
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: SECONDARY_COLOR,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 18,
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  bold: {
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  banner: {
    width: "100%",
    height: 160,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  weatherCard: {
    width: "100%",
    backgroundColor: CARD_BG,
    borderRadius: 14,
    padding: 18,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    marginBottom: 22,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: PRIMARY_COLOR,
    textTransform: "capitalize",
    letterSpacing: 0.2,
  },
  info: {
    fontSize: 15,
    marginVertical: 3,
    color: "#333",
  },
  infoLabel: {
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  subTitle: {
    alignSelf: "flex-start",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 12,
    color: PRIMARY_COLOR,
    marginTop: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  card: {
    width: "47%",
    height: 110,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: CARD_BG,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 18,
    color: PRIMARY_COLOR,
    letterSpacing: 0.3,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SECONDARY_COLOR,
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingLeft: 16,
  },
  temperature: {
    fontSize: 42,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginRight: 16,
  },
  weatherDetails: {
    flex: 1,
    justifyContent: "center",
  },
});
