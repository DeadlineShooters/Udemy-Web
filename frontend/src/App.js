import { json } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { AuthProvider } from "./AuthContextProvider.jsx";
import { CourseProvider } from "./CourseContextProvider.jsx";
import { AppRouterProvider } from "./AuthRouterProvider.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./reducers/store.js";

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AuthProvider>
            <CourseProvider>
              <ToastContainer />
              <AppRouterProvider />
            </CourseProvider>
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
