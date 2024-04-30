import { json } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { AuthProvider } from "./AuthContextProvider.jsx";
import { CourseProvider } from "./CourseContextProvider.jsx";
import { AppRouterProvider } from "./AuthRouterProvider.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { CartProvider } from "./CartRouterProvider.js";
import { WishlistProvider } from "./CartRouterProvider.js";
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
            <CartProvider>
              <WishlistProvider>
                <CourseProvider>
                  <ToastContainer />
                  <AppRouterProvider />
                </CourseProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
