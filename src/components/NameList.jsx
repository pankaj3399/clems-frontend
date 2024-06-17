import { useState } from "react"

import Loader from "./Loader"
import Modal from "./Modal"

const AdditionIcon = () => (
	<svg
		ariaHidden="true"
		focusable="false"
		className="text-green-400 w-6 h-6"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
	>
		<path
			fill="currentColor"
			d="M224 232C237.3 232 248 242.7 248 256V304H296C309.3 304 320 314.7 320 328C320 341.3 309.3 352 296 352H248V400C248 413.3 237.3 424 224 424C210.7 424 200 413.3 200 400V352H152C138.7 352 128 341.3 128 328C128 314.7 138.7 304 152 304H200V256C200 242.7 210.7 232 224 232zM152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"
		></path>
	</svg>
)

const UpdatedIcon = () => (
	<svg
		ariaHidden="true"
		focusable="false"
		className="text-blue-400 w-6 h-6"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
	>
		<path
			fill="currentColor"
			d="M216.1 408.1C207.6 418.3 192.4 418.3 183 408.1L119 344.1C109.7 335.6 109.7 320.4 119 311C128.4 301.7 143.6 301.7 152.1 311L200 358.1L295 263C304.4 253.7 319.6 253.7 328.1 263C338.3 272.4 338.3 287.6 328.1 296.1L216.1 408.1zM128 0C141.3 0 152 10.75 152 24V64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0zM400 192H48V448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192z"
		></path>
	</svg>
)

const RemovedIcon = () => (
	<svg
		ariaHidden="true"
		focusable="false"
		className="text-red-400 w-6 h-6"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
	>
		<path
			fill="currentColor"
			d="M152 352C138.7 352 128 341.3 128 328C128 314.7 138.7 304 152 304H296C309.3 304 320 314.7 320 328C320 341.3 309.3 352 296 352H152zM128 0C141.3 0 152 10.75 152 24V64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0zM400 192H48V448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192z"
		></path>
	</svg>
)

export default function NameList({ title = "", list = [] }) {
	const [showCounter, setShowCounter] = useState(25)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState({});

	function onSetShowCounter() {
		if (showCounter < list.length) {
			setShowCounter(showCounter + 25)
		}
	}

	const openModal = (data) => {
		setSelectedRow(data);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	function getIconTextColor(title) {
		switch (title) {
			case "Added":
				return "text-green-500"
			case "Updated":
				return "text-gray-800"
			case "Removed":
				return "text-red-500"
			default:
				return "text-green-500"
		}
	}

	function getIcon(title) {
		switch (title) {
			case "Added":
				return <AdditionIcon />
			case "Updated":
				return <UpdatedIcon />
			case "Removed":
				return <RemovedIcon />
			default:
				return <AdditionIcon />
		}
	}

	return (
		<>
		<ul className="border-2 border-gray-800 p-2 rounded col-span-3 lg:col-span-1 w-full mt-3 list-disc list-inside">
			<div
				className={`text-lg bg-gray-600 space-x-3 text-white py-3 text-center font-bold mb-2 flex gap-2 items-center justify-center`}
			>
				<span>{getIcon(title)}</span>
				<span>
					{title} : {list.length} companies
				</span>
			</div>
			<div className="mx-4 mt-4">
			{list && list.length > 0 ? (
				list.slice(0, showCounter).map((row) => (
					<li
						key={row._id}
						className="cursor-pointer my-2 hover:underline hover:font-semibold"
						onClick={() => { openModal(row) }}
					>
						{row.name}
					</li>
				))
			) : (
				<div className="py-6">
					<Loader />
				</div>
			)}
			</div>
			<Modal
				isOpen={isModalOpen}
				closeModal={closeModal}
				data={selectedRow}
			/>
			{showCounter <= list.length && (
				<>
					<div
						className={`underline font-semibold hover:font-bold cursor-pointer text-lg`}
						onClick={onSetShowCounter}
					>
						... and {list.length - showCounter} more
					</div>
				</>
			)}
		</ul>
		
		</>
	)
}
