import './App.css';
import { AuthContextProvider } from './AuthContextProvider.jsx';
import { AppRouterProvider } from './AuthRouterProvider.jsx';

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <AppRouterProvider/>
      </AuthContextProvider>
    </div>
  );
}

export default App;