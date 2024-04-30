import { json } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './AuthContextProvider.jsx';
import { AppRouterProvider } from './AuthRouterProvider.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { CartProvider, WishlistProvider } from './CourseContextProvider.jsx';

const App = () => {
	return (
		<div className='App'>
			<AuthContextProvider>
				<CartProvider>
					<WishlistProvider>
						<ToastContainer />
						<AppRouterProvider />
					</WishlistProvider>
				</CartProvider>
			</AuthContextProvider>
		</div>
	);
};

export default App;
