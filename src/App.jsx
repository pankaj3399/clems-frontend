import { useEffect, useState } from "react"
import NameList from "./components/NameList"
import { Sidebar } from "./components"

function getFormattedDate(d = new Date().toString()) {
	const date = new Date(d)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")

	return `${year}-${month}-${day}`
}

function App() {
	const [additions, setAdditions] = useState([])
	const [updates, setUpdates] = useState([])
	const [removals, setRemovals] = useState([])
	const [updateDate, setUpdateDate] = useState(new Date())

	const [currPage, setCurrPage] = useState(1)
	const [historyData, setHistoryData] = useState([])

	const [noMoreHistory, setNoMoreHistory] = useState(false)
	console.log(import.meta.env.VITE_SERVER_URL)

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/today`)
			const data = await res.json()

			console.log(data)
			setAdditions(data?.additions)
			setUpdates(data?.updates)
			setRemovals(data?.removals)
			setUpdateDate(data?.updateDate)
		}
		fetchData()
	}, [])

	async function onShowHistory() {
		setCurrPage(currPage + 1)
		console.log("HERE")
		const res = await fetch(
			`${import.meta.env.VITE_SERVER_URL}/page/${currPage}`
		)
		const data = await res.json()

		if (!data.ok) {
		}

		console.log(data)

		if (data.additions.length <= 0) {
			setNoMoreHistory(true)
		} else {
			setHistoryData((state) => [
				...state,
				{
					additions: data.additions,
					removals: data.removals,
					updates: data.updates,
					updateDate: data.updateDate,
				},
			])
		}
		console.log(data)
	}

	return (
		<>
		<div className="mt-5">
			<div>
				<div className="border-t-4 border-b-4 border-gray-800 py-2 mb-4">
					<h1 className="text-center text-xl lg:text-2xl font-bold">
					Updated Licenses on{" "}
									{new Date(updateDate).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									})}
					</h1>
				</div>
				<div className="grid grid-cols-3 lg:gap-x-4 mx-8">
					<NameList title="Added" list={additions} />
					<NameList title="Updated" list={updates} />
					<NameList title="Removed" list={removals} />
				</div>
			</div>

			{historyData.map((history) => (
				<div className="mt-6">
					<div className="border-t-4 border-b-4 border-gray-800 py-2 mb-4">
					<h1 className="text-center text-xl lg:text-2xl font-bold">
							Updated Licences on{" "}
							{new Date(history.updateDate).toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							})}
						</h1>
				</div>
				<div className="grid grid-cols-3 lg:gap-x-4 mx-8">
					<NameList title="Added" list={history.additions} />
					<NameList title="Updated" list={history.updates} />
					<NameList title="Removed" list={history.removals} />
					</div>
				</div>
			))}
		</div>

		<div className="w-full flex justify-center items-center mt-10">
			{noMoreHistory ? (
				<div>Nothing More To Show :)</div>
			) : (
				<button
					className="px-10 py-3 rounded-sm bg-gray-800 text-white font-bold"
					onClick={onShowHistory}
				>
					SHOW MORE
				</button>
			)}
		</div>

		</>
	)
}

export default App
