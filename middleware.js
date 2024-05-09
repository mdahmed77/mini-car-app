import { auth } from "@/auth";
import { privateRoutes, authRoutes, DEFAULT_REDIRECT_LOGIN_URL, DEFAULT_REDIRECT_HOME_URL } from './routes';

export default auth((req) => {
  const { nextUrl } = req;
  const route = nextUrl?.pathname; // Use optional chaining to prevent accessing undefined property

  const isLoggedIn = !!req.auth;

  console.log(route);

  // Check if route is defined
  if (!route) {
    // Handle the case where route is undefined
    return null;
  }

  // Check if the route is in authRoutes
  const isAuthRoute = authRoutes.some((authRoute) => route.startsWith(authRoute));

  // Check if the route is in privateRoutes
  const isPrivateRoute = privateRoutes.includes(route);

  // Redirect logic
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, nextUrl));
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_LOGIN_URL, nextUrl));
  }

  return null;
});
