import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import './styles.css';

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div >
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return (
      <div className="containerError">
        <div>
          <h1>OPSSSS... </h1>
          <h2>O seu token expirou ... Faça o Login novamente para continuar navegando</h2>
          <div className="link">
            <Link  to="/">Página de login</Link>
          </div>

        </div>
      </div>)
      ;
  }
}

export default ErrorBoundary;