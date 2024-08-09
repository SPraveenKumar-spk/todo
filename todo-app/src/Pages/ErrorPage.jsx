import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <>
      <div className="container">
        <div className="text-center mt-5">
          <h1>404</h1>
          <p>Oops! The page you are looking for does not exist.</p>
          <Link to="/">Go back to Home</Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
