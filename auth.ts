import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

const ADMIN_EMAIL = process.env.AUTH_ADMIN_EMAIL ?? "admin@cedarridgeward.org";
const ADMIN_PASSWORD = process.env.AUTH_ADMIN_PASSWORD ?? "Password123!";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    trustHost: true,
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsed.success) {
                    return null;
                }

                const { email, password } = parsed.data;

                if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
                    return null;
                }

                const passwordMatches = password === ADMIN_PASSWORD;
                if (!passwordMatches) {
                    return null;
                }

                return {
                    id: "admin",
                    name: "Ward Administrator",
                    email: ADMIN_EMAIL,
                };
            },
        }),
    ],
});
