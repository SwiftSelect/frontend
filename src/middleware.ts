import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Export the middleware config first
export const config = {
  matcher: [
    // Protect these routes
    '/candidate/:path*',
    '/recruiter/:path*',
    '/profile/:path*',
    '/login',  // Include login to handle redirects for authenticated users
  ]
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname;

    if (pathname === '/login') {
      if (isAuth) {
        if (token?.isRecruiter) {
          return NextResponse.redirect(new URL('/recruiter', req.url));
        } else {
          return NextResponse.redirect(new URL('/candidate', req.url));
        }
      }
      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname === '/recruiter' && !token?.isRecruiter) {
      return NextResponse.redirect(new URL('/candidate', req.url));
    }
      if (pathname === '/candidate' && token?.isRecruiter) {
      return NextResponse.redirect(new URL('/recruiter', req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => true 
    },
  }
); 