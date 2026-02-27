import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";

export const Navbar = () => {

    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
        setIsLoggedIn(false);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ToDo Application</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        {isLoggedIn && 
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/todos">ToDos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/categories">Categories</Link>
                                </li>
                            </>
                        }
                    </ul>
                    {isLoggedIn ?
                        <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        :
                        <div className="d-flex justify-content-start">
                            <Link className="btn btn-outline-success me-2" to="/login">Sign In</Link>
                            <Link className="btn btn-outline-secondary" to="/register">Register</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}