import { json } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { AuthProvider } from "./AuthContextProvider.jsx";
import { CourseProvider } from "./CourseContextProvider.jsx";
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
        <AuthProvider>
          <ToastContainer />
          <AppRouterProvider />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
