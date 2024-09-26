// Protect routes
//
// ref: https://clerk.com/docs/references/astro/clerk-middleware#protect-routes-based-on-user-authentication-status
//

// import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// export const onRequest = clerkMiddleware((auth, context, next) => {
//   const { redirectToSignIn, userId } = auth();

//   if (!userId && isProtectedRoute(context.request)) {
//     // Add custom logic to run before redirecting

//     return redirectToSignIn({
//       returnBackUrl: '/'
//     });
//   }

//   return next()
// });
