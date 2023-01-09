import SignIn from "../pages/sign-in";
import Map from "../pages/map";
const authProtectedRoutes = [
  { path: "/SignIn", component: SignIn },

  { path: "/Map", component: Map },
];
export { authProtectedRoutes };
