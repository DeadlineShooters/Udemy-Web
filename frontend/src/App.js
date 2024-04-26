import { json } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContextProvider.jsx';
import { CourseProvider } from './CourseContextProvider.jsx';
import { AppRouterProvider } from './AuthRouterProvider.jsx';
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <CourseProvider>
          <ToastContainer/>
          <AppRouterProvider/>
        </CourseProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
