import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf|eot)$).*)",
    ],
};
