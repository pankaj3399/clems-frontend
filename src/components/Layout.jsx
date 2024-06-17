import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

export default function Layout({ children }) {
	return (
		<div className="font-Montserrat w-screen min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
			<div className="bg-gray-800 p-3">
				<div className="lg:flex lg:items-center">
				<Header />
				<Sidebar />
				</div>
			</div>

			<main className="flex-1">
				<Outlet />
			</main>

			<Footer />
		</div>
	)
}
