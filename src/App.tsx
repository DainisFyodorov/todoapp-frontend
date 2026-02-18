import './App.css';
import { AuthProvider } from './utils/AuthProvider';
import { Navbar } from './layouts/Navbar/Navbar';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
        <Navbar />
        
        <Route path='/'>
          {/* home page */}
        </Route>
      </AuthProvider>
    </div>
  );
}

export default App;
