import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import AppRoutes from "./routes/app.routes";
import { AuthContext } from "./app/components/context/auth.context";
import { RootStackNavigation } from "./routes/root.stack.navigation";

function RoutesControl() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0156a7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <RootStackNavigation />}
    </NavigationContainer>
  );
}