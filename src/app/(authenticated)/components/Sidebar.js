import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/app/assets/cluster.png";

const Sidebar = () => {
	return (
		<div className="w-60 p-5 rounded-[12px] bg-white/30 shadow-[0_0_25px_0_rgba(0,0,0,0.1)] backdrop-blur-[2px]">
			<div className="flex justify-center	h-[100px] mb-5">
				<Image src={logo} alt="R logo" className="w-auto h-auto"/>
			</div>
			<aside className="transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
				<div className="h-full py-4 overflow-y-auto">
					<ul className="space-y-2 font-medium">
						<li>
							<Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
								<svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
								</svg>
								<span className="ms-3">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href="/api/auth/signout" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
							</Link>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	)
};

export default Sidebar;
