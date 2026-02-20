import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <main className="flex-grow-1">
            <div className="container py-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow-sm text-center">
                            <div className="card-body py-5">
                                <h1 className="display-1 fw-bold text-primary">
                                    404
                                </h1>
                                <h4 className="mb-3">
                                    Page not found
                                </h4>
                                <p className="text-muted mb-4">
                                    The page you are looking for doesn't exist or was moved.
                                </p>
                                <Link to='/' className="btn btn-primary btn-lg">
                                    Go Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}