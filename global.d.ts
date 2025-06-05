import { RootStackParamList } from "./app/routes/root.stack.navigation";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}