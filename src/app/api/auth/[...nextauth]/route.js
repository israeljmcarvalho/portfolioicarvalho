import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "./users.json";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},

			async authorize(credentials) {
				const { email, password } = credentials;

				try {
					const user = await users.find((user) => user.email === email)

					if (!user) {
						return null;
					}

					const passwordsMatch = await password === user.password;

					if (!passwordsMatch) {
						return null;
					}
					return user;
				} catch (error) {
					console.log("Error: ", error);
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
