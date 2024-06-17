import logo from "../assets/logo.png"

export default function Header() {
	return (
		<header className="w-screen px-4 py-6 flex justify-center">
			<div className="flex flex-col space-x-5 items-center">
			<div className="bg-white">
				<img src={logo} alt="UK Sponsor License Checker" className="w-40 h-36" />
			</div>
			<div className="text-center">
				<h1 className="text-white font-bold text-2xl">UK Sponsor License Checker</h1>
				<h2 className="text-white font-semibold text-base">Register of licensed sponsors: workers - GOV.UK</h2>
			</div>
			</div>
		</header>
	)
}
