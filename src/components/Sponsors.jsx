import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Modal from './Modal';

function Sponsors() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const openModal = (data) => {
        console.log(data);
        setSelectedRow(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    async function fetchData(searchData) {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/sponsors?search=${searchData}`)
        const data = await res.json()

        console.log(data);
        setSearchResults(data);
    }

    const handleSearch = () => {
        // Handle search logic
        console.log('Searching for:', searchTerm);
        fetchData(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <div className="w-full flex gap-8">
            <div className="flex flex-1 flex-col px-1 py-6 mt-6 mx-8">
                <h1 className="text-xl font-bold mb-2">Search by company or business</h1>
                <hr className="w-full border-t-2 border-gray-300 mb-4" />
                <div className="lg:flex lg:items-center gap-4 w-full pr-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter company name ..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
                    />
                    <div className="flex gap-2 items-end justify-end mt-3 lg:mt-0">
                        <button
                            onClick={handleSearch}
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Search
                        </button>
                        <button
                            onClick={handleClear}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className="mt-8 px-1">
                    <h2 className="text-md font-bold mb-2">Register of sponsors - {searchResults.count ? searchResults.count : 0} of {searchResults.countTotal ? searchResults.countTotal : 0} companies</h2>
                    <hr className="w-full border-t-2 border-gray-300 mb-4" />
                    <div className="flex flex-col gap-4 w-full pr-8">
                        <div className="flex gap-2 p-2 text-gray-500">
                            <div className="w-2/5 ">
                                <h3 className="text-sm font-bold">Company</h3>
                            </div>
                            <div className="w-1/5">
                                <h3 className="text-sm font-bold">Location</h3>
                            </div>
                            <div className="w-2/5">
                                <h3 className="text-sm font-bold">Licence Tiers</h3>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            {
                                searchResults.sponsors && searchResults.sponsors.map((sponsor) => (
                                    <div key={sponsor._id} className="flex gap-2 bg-white px-2 rounded-md py-4 overflow-y-auto max-h-64">
                                        <div className="w-2/5" onClick={() => { openModal(sponsor) }}>
                                            <h1 className="text-xl font-semibold underline underline-offset-4 cursor-pointer">{sponsor["Organisation Name"]}</h1>
                                        </div>
                                        <div className="w-1/4">
                                            <h3 className="text-sm font-light">{`${sponsor["Town/City"]}${sponsor["County"] ? `, ${sponsor["County"]}` : ''}`}</h3>
                                        </div>
                                        <div className="w-2/4">
                                            <h3 className="text-sm font-light">{`${sponsor["Type & Rating"]}${sponsor["Route"] ? ` - ${sponsor["Route"]}` : ''}`}</h3>
                                        </div>
                                    </div>
                                ))
                            }
                            < Modal
                                isOpen={isModalOpen}
                                closeModal={closeModal}
                                data={selectedRow}
                                fromSponsors={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sponsors;