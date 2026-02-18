export const Footer = () => {
    return (
        <footer className="text-center py-4 border-top">
            <small className="text-muted">
                © {new Date().getFullYear()} ToDo Application
            </small>
        </footer>
    );
}