import { Home, Profile, SignIn, SignUp, Marketplace, PasswordRecovery, Iamodule } from "@/pages"; // Importar AIModule correctamente
import { CreateProduct } from "@/pages/marketplace/create-product";
export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "password-recovery",
    path: "/password-recovery",
    element: <PasswordRecovery />, // Agregar la ruta de PasswordRecovery
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
    protected: true,
  },
  {
    name: "AI Module",
    path: "/iamodule/iamodule",
    element: <Iamodule />, // Usar AIModule correctamente
    protected: true,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
    protected: false, // Solo visible cuando no está autenticado
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
    protected: false, // Solo visible cuando no está autenticado
  },
  {
    name: "Marketplace",
    path: "/marketplace/marketplace",
    element: <Marketplace />,
    protected: true, // Solo visible cuando está autenticado
  },
];

export const hiddenRoutes = [
  {
    name: "Create Product",
    path: "/marketplace/create-product",
    element: <CreateProduct />,
  }
  
];

export default routes;
