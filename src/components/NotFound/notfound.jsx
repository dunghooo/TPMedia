import "./notfound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <p>The page you are looking for doesn't exist or has been moved</p>
        <a href="/" className="notfound-button">
          Back to home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
