import { Inter } from 'next/font/google';
import '@/css/globals.css';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthProvider from '@/app/context/AuthProvider';
import Sidebar from "@/app/(authenticated)/components/Sidebar";
import Header from "@/app/(authenticated)/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Clustering',
	description: 'Run a R script',
}

export default async function RootLayout({ children }) {

	const session = await getServerSession(authOptions);

  	if (!session) {
		redirect("/login");
	}

	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<main className="flex min-h-screen p-5 gap-5 bg-white">
						<Sidebar/>
						<div className="flex flex-1 flex-col gap-5 relative">
							{/* <Header /> */}
							{children}
						</div>
					</main>
				</AuthProvider>
			</body>
		</html>
	)
}
