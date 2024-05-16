import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/state/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
