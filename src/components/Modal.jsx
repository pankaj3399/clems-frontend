export default function ({
    isOpen,
    closeModal,
    data,
    fromSponsors = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-45 flex">
            <div className="relative p-8 bg-white max-w-md m-auto flex-col flex rounded-lg">
                <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.95 5.05a.75.75 0 0 0-1.06 0L10 8.94 6.11 5.05a.75.75 0 0 0-1.06 1.06L8.94 10 5.05 13.89a.75.75 0 1 0 1.06 1.06L10 11.06l3.89 3.89a.75.75 0 0 0 1.06-1.06L11.06 10l3.89-3.89a.75.75 0 0 0 0-1.06z"
                        />
                    </svg>
                </button>
                {
                    fromSponsors ?
                        (
                            <div className="p-4">
                                <h2 className="text-center text-xl font-bold mb-4">{data?.["Organisation Name"]}</h2>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Location:</span>{" "}
                                    {data?.["Town/City"]}{data?.["County"] ? `, ${data?.["County"]}` : ""}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Licence Tiers:</span>{" "}
                                    {data?.["Type & Rating"]}{data?.["Route"] ? ` - ${data?.["Route"]}` : ""}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Date:</span> {data?.date}
                                </p>
                            </div>
                        ) : (
                            <div className="p-4">
                                <h2 className="text-center text-xl font-bold mb-4">{data?.name}</h2>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Location:</span>{" "}
                                    {data?.townCity}{data?.county ? `, ${data?.county}` : ""}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Licence Tiers:</span>{" "}
                                    {data?.type}{data?.route ? ` - ${data?.route}` : ""}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Date:</span> {data?.date}
                                </p>
                            </div>
                        )
                }
            </div>
        </div>
    );
};