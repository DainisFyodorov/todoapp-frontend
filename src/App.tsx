import './App.css';
import { AuthProvider } from './utils/AuthProvider';
import { Navbar } from './layouts/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/Navbar/Footer';
import { LoginPage } from './layouts/Auth/LoginPage';
import { RegisterPage } from './layouts/Auth/RegisterPage';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { TodosPage } from './layouts/TodoPage/TodosPage';
import { NotFoundPage } from './layouts/Util/NotFoundPage';
import { CategoriesPage } from './layouts/CategoryPage/CategoriesPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
        <Navbar />
        
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
          <Route path='/todos' element={
            <ProtectedRoute>
              <TodosPage />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/categories' element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          } />
          <Route path='*' Component={NotFoundPage} />
        </Routes>

        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
