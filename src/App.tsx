import './App.css';
import { AuthProvider } from './utils/AuthProvider';
import { Navbar } from './layouts/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/Navbar/Footer';
import { LoginPage } from './layouts/Auth/LoginPage';
import { RegisterPage } from './layouts/Auth/RegisterPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
        <Navbar />
        
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
        </Routes>

        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
