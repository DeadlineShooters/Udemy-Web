import { json } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './AuthContextProvider.jsx';
import { AppRouterProvider } from './AuthRouterProvider.jsx';
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <ToastContainer/>
        <AppRouterProvider/>
      </AuthContextProvider>
    </div>
  );
}

export default App;
