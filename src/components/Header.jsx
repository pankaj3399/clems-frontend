import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import logo from "../assets/logo.jpg"
import { useNavigate } from "react-router-dom";

const sideBardLinks = [
	{
		name: "Last updates",
		path: "/",
		icon: (
			<svg
				ariaHidden="true"
				focusable="false"
				className="w-6 h-6"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
			>
				<path
					fill="currentColor"
					d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"
				></path>
			</svg>
		),
	},
	{
		name: "Register of sponsors",
		path: "/sponsors",
		icon: (
			<svg
				ariaHidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="certificate"
				className="w-6 h-6"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					fill="currentColor"
					d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"
				></path>
			</svg>
		),
	},
	// {
	//     name: "About",
	//     path: "about",
	//     icon: (
	//         <svg
	//             ariaHidden="true"
	//             focusable="false"
	//             className="w-4 h-4"
	//             role="img"
	//             xmlns="http://www.w3.org/2000/svg"
	//             viewBox="0 0 512 512"
	//         >
	//             <path
	//                 fill="currentColor"
	//                 d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
	//             ></path>
	//         </svg>
	//     ),
	// },
]

const Navbar = () => {
	const navigate = useNavigate();

	// Initialize `isOpen` based on screen width
	const [isOpen, setIsOpen] = React.useState(window.innerWidth >= 768);

	// Update the state upon resizing
	React.useEffect(() => {
		function handleResize() {
			if (window.innerWidth >= 768) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		}

		window.addEventListener('resize', handleResize);
		// Cleanup the event listener on component unmount
		return () => window.removeEventListener('resize', handleResize);
	}, [window.innerWidth]);

	return (
		<nav className="bg-white shadow-lg lg:text-lg mb-2">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					{/* <!-- logo --> */}
					<div className="flex justify-center items-center space-x-2">
						<div>
							<div className="h-16 w-16 lg:h-20 lg:w-20 mr-1" >
								<img alt="logo" src={logo} />
							</div>
						</div>
						<div className="font-bold text-xs">
							<h1>UK Sponsor License Checker</h1>
							<h2>Register of licensed sponsors: workers - GOV.UK</h2>
						</div>
					</div>

					{/* <!-- primary nav --> */}
					<div className="hidden md:flex items-center space-x-4">
						{sideBardLinks.map((link, index) => (
							<div key={index} onClick={() => { navigate(link.path) }}>
								<p className="py-5 cursor-pointer px-3 hover:underline">{link.name}</p>
							</div>
						))}

					</div>

					{/* <!-- mobile button goes here --> */}
					<div className="md:hidden flex items-center">
						<button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
							<svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* <!-- mobile menu --> */}
			<div className={isOpen ? "mobile-menu md:hidden" : "mobile-menu hidden md:hidden"}>
				{sideBardLinks.map((link, index) => (
					<div key={index} className="hover:bg-gray-800 hover:text-white" onClick={() => { navigate(link.path) }}>
						<div >
							<p className="py-2 cursor-pointer px-3 hover:underline">{link.name}</p>
						</div>
					</div>
				))}
				
			</div>
		</nav>
	);
};

export default Navbar;
