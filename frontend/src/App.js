import { json } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { AuthContextProvider } from "./AuthContextProvider.jsx";
import { AppRouterProvider } from "./AuthRouterProvider.jsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AuthContextProvider>
          <ToastContainer />
          <AppRouterProvider />
        </AuthContextProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
