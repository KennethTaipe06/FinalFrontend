import { Home, Profile, SignIn, SignUp, Marketplace, PasswordRecovery } from "@/pages"; // Importar PasswordRecovery

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
    path: "/marketplace",
    element: <Marketplace />,
    protected: true, // Solo visible cuando está autenticado
  },
];

export default routes;
