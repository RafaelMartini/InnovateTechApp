import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/state/store";

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
