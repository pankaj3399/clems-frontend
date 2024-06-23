import Footer from "./Footer"
import Header from "./Header"
import Sticky from "./Sticky"
import Sidebar from "./Sidebar"
import CarouselSection from "./carousel-section"
import { Outlet } from "react-router-dom"

export default function Layout({ children }) {
	return (
		<div className="font-Montserrat w-screen min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
			
			<div className="fixed inset-x-0 z-50 bg-gray-800 h-fit">
				<Header />
				<Sticky />
			</div>

			<main className="flex-1 mt-44">
				<Outlet />
			</main>
			
			<CarouselSection />
			<Footer />
		
		</div>
	)
}
