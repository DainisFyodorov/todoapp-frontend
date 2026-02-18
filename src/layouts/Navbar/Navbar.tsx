import { useAuth } from "../../utils/AuthProvider";

export const Navbar = () => {

    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = async () => {
        await fetch('http://localhost:8080/api/auth/logout', { method: 'POST', credentials: 'include' });
        setIsLoggedIn(false);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">ToDo Application</a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">ToDos</a>
                        </li>
                    </ul>
                    {isLoggedIn ?
                        <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        :
                        <div className="d-flex justify-content-start">
                            <a className="btn btn-outline-success me-2" href="/">Sign In</a>
                            <a className="btn btn-outline-secondary" href="/">Register</a>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}