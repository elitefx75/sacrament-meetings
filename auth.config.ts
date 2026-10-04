import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    trustHost: true,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtected =
                nextUrl.pathname === "/meetings/new" ||
                /^\/meetings\/\d+\/edit$/.test(nextUrl.pathname);

            if (isProtected) {
                return isLoggedIn;
            }

            if (isLoggedIn && nextUrl.pathname === "/login") {
                return Response.redirect(new URL("/meetings/new", nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
