import LoginForm from './loginForm';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Login() {
	const session = await getServerSession(authOptions);

  	if (session) {
		redirect("/");
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<LoginForm/>
		</main>
	)
}