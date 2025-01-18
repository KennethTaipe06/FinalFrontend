import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { useAuth } from "@/context/auth"; // Importa el contexto de autenticación

function App() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

  return (
    <>
      {!(pathname === '/sign-in' || pathname === '/sign-up') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )}
      <Routes>
        {routes.map(({ path, element, protected: isProtected }, key) =>
          element && (
            <Route
              key={key}
              exact
              path={path}
              element={
                isProtected && !isAuthenticated ? (
                  <Navigate to="/sign-in" replace />
                ) : (
                  element
                )
              }
            />
          )
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
