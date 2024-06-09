import Footer from "./Footer"
import Header from "./Header"

export default function Layout({ children }) {
	return (
		<div className="w-screen min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
			<Header />

			<main className="flex-1">{children}</main>

			<Footer />
		</div>
	)
}
