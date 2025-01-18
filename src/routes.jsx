import { Home, Profile, SignIn, SignUp, Marketplace } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
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
