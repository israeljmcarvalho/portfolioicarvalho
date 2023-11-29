import { Inter } from 'next/font/google';
import '@/css/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Clustering',
	description: 'Run a R script',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="flex min-h-screen items-start justify-center p-6">
					{children}
				</main>
			</body>
		</html>
	)
}
