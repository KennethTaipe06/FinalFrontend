import { Home, Profile, SignIn, SignUp, Marketplace } from "@/pages";
import { CreateProduct } from "@/pages/marketplace/create-product";

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
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Marketplace",
    path: "/marketplace",
    element: <Marketplace />,
  },
];

export const hiddenRoutes = [
  {
    name: "Create Product",
    path: "/marketplace/create-product",
    element: <CreateProduct />,
  },
];

export default routes;
