import './App.css';
import { AuthProvider } from './utils/AuthProvider';
import { Navbar } from './layouts/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './layouts/HomePage/HomePage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
        <Navbar />
        
        <Routes>
          <Route path='/' Component={HomePage} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
