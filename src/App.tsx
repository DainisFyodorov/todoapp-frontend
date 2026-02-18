import './App.css';
import { AuthProvider } from './utils/AuthProvider';
import { Navbar } from './layouts/Navbar/Navbar';

function App() {
  return (
    <AuthProvider>
      <div className='container'>
      </div>
    </AuthProvider>
  );
}

export default App;
