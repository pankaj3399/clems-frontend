import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Modal from "./Modal";

const categories = {
    "Healthcare Services": [
        "Care Services",
        "Care",
        "Carer",
        "Carers",
        "Healthcare",
        "Podiatry",
        "Paediatrics",
        "Nanny",
        "Child Minder",
        "Homecare",
    ],
    "Medical Services": [
        "Hospital",
        "Health Foundation Trust",
        "Nursing",
        "Dentistry",
        "Dentist",
        "Optometrist",
        "Optometry",
        "Therapy",
        "Physiotherapy",
        "Psychiatry",
        "Medical Practice",
        "Medical Clinic",
        "Medics",
    ],
    "Construction Services": [
        "Masonry",
        "Dryliners",
        "Drylining",
        "Roofers",
        "Integral Design",
        "Mason",
        "Construction",
        "Builders",
        "Building",
        "Architectural",
        "Architecture",
        "Contractors",
    ],
    "Educational Institutions": [
        "Schools",
        "Colleges",
        "Universities",
        "Tutors",
        "Teaching",
        "Education",
        "Training Centers",
        "Academies",
    ],
    "Charity and Non-Profit Services": [
        "Charity",
        "Non-Profit Organizations",
        "Voluntary Services",
        "Social Services",
        "Community Service",
    ],
    "Religious Services": [
        "Churches",
        "Temple",
        "Mosque",
        "Synagogues",
        "Religious Organizations",
        "Faith-Based Services",
        "Chapel",
        "Faith Centre",
    ],
    "IT and Technology Services": [
        "Software Development",
        "IT Support",
        "Cybersecurity",
        "Data Analysis",
        "Tech Services",
        "Information Technology",
        "Networking Services",
        "Software",
        "Technology",
    ],
    "Finance and Accounting Services": [
        "Accounting",
        "Bookkeeping",
        "Financial Services",
        "Auditing",
        "Taxation",
        "Payroll Services",
        "Investment Services",
        "Accountancy",
    ],
    "Legal Services": [
        "Solicitors",
        "Barristers",
        "Law Firms",
        "Legal Consultancy",
        "Legal Advice",
        "Paralegal Services",
        "Chambers",
        "Legal",
        "Law",
    ],
    "Retail Services": [
        "Retail",
        "Shops",
        "Supermarkets",
        "Stores",
        "E-commerce",
        "Boutique",
    ],
    "Hospitality Services": [
        "Hotel",
        "Restaurant",
        "Cafe",
        "Catering",
        "Hospitality Management",
        "Bed and Breakfast",
        "Hospitality",
    ],
    "Manufacturing Services": [
        "Manufacturing",
        "Production",
        "Assembly",
        "Fabrication",
        "Industrial Services",
        "Industry",
    ],
    "Transportation and Logistics Services": [
        "Transportation",
        "Logistics",
        "Delivery Services",
        "Freight",
        "Shipping",
        "Courier Services",
        "Freight",
        "Delivery",
        "Courier",
        "Removal",
    ],
    "Cleaning Services": [
        "Cleaning",
        "Janitorial",
        "Housekeeping",
        "Sanitation",
        "Commercial Cleaning",
        "Cleaner",
    ],
    "Real Estate Services": [
        "Real Estate",
        "Property Management",
        "Lettings",
        "Estate Agents",
        "Property Development",
        "Lets",
        "Estate",
    ],
    "Marketing and Advertising Services": [
        "Marketing",
        "Advertising",
        "Digital Marketing",
        "Public Relation",
        "Branding",
        "Market Research",
    ],
    "Human Resources Services": [
        "Recruitment",
        "Staffing",
        "HR Services",
        "Talent Acquisition",
        "Employment Agencies",
    ],
    "Consulting Services": [
        "Business Consulting",
        "Management Consulting",
        "Strategy Consulting",
        "Advisory Services",
        "Professional Services",
        "Consulting Services",
        "consultancy",
    ],
    "Agricultural Services": [
        "Farming",
        "Agriculture",
        "Horticulture",
        "Forestry",
        "Agribusiness",
        "Fish",
        "Meat",
        "Vessel",
    ],
    "Entertainment and Media Services": [
        "Entertainment",
        "Media",
        "Film Production",
        "Television",
        "Radio Broadcasting",
        "Music Production",
    ],
    "Sports and Recreation Services": [
        "Sports Club",
        "Fitness Centre",
        "Gyms",
        "Recreation",
        "Sports Coaching",
        "Sports",
    ],
    "Energy and Utilities Services": [
        "Energy",
        "Utilities",
        "Power Generation",
        "Renewable Energy",
        "Gas and Electric",
    ],
    "Telecommunication Services": [
        "Telecommunication",
        "Telecom",
        "Internet Providers",
        "Mobile Network",
        "Broadband Services",
        "Internet",
        "Network",
    ],
    "Engineering Services": [
        "Engineering",
        "Civil Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Structural Engineering",
        "Civil",
        "Electrical",
        "Electrics",
        "Electronics",
    ],
    "Environmental Services": [
        "Environmental Consultancy",
        "Waste Management",
        "Recycling",
        "Environmental Conservation",
        "Sustainability Services",
    ],
    "Arts and Culture Services": [
        "Museums",
        "Galleries",
        "Cultural Institutions",
        "Art Studios",
        "Performing Arts",
    ],
    "Food and Beverage Services": [
        "Food Services",
        "Beverage",
        "Food Production",
        "Breweries",
        "Restaurant",
        "Joint",
        "Khebab",
        "Foods",
        "Bar",
    ],
    "Security Services": [
        "Security",
        "Surveillance",
        "Private Security",
        "Alarm Services",
        "Security Consulting",
    ],
    "Automotive Services": [
        "Car Dealerships",
        "Auto Repair",
        "Vehicle Maintenance",
        "Automotive Parts",
        "Mechanics",
        "Body work",
        "MOT",
        "Auto Services",
    ],
    "Travel and Tourism Services": [
        "Travel Agencies",
        "Tour Operators",
        "Tourism Services",
        "Airline",
        "Travel Consultancy",
        "Tour",
    ],
    "Pharmaceutical Services": [
        "Pharmaceutical",
        "Drug Manufacturing",
        "Pharmacy Services",
        "Biotech",
        "Clinical Trials",
    ],
    "Social Services": [
        "Social Work",
        "Community Services",
        "Non-Profit Organizations",
        "Charities",
        "Welfare Services",
    ],
    "Childcare Services": [
        "Nurseries",
        "Daycare",
        "Childminders",
        "After School Clubs",
        "Early Years Education",
        "Nanny",
        "Childminding",
        "Nursery",
    ],
    "Animal Care Services": [
        "Veterinary Services",
        "Animal Shelters",
        "Pet Grooming",
        "Animal Training",
        "Pet Boarding",
        "Groomers",
    ],
    "Event Management Services": [
        "Event Planning",
        "Conference Services",
        "Wedding Planning",
        "Event Planner",
        "Corporate Events",
        "Event",
    ],
    "Publishing Services": [
        "Book Publishing",
        "Magazine Publishing",
        "Digital Publishing",
        "Editorial Services",
        "Print Media",
    ],
    "Interior Design Services": [
        "Interior Design",
        "Home Staging",
        "Decorating Services",
        "Decorators",
        "Space Planning",
        "Residential Design",
    ],
    "Graphic Design Services": [
        "Graphic Design",
        "Branding",
        "Visual Communication",
        "Print Design",
        "Digital Design",
    ],
    "Research and Development Services": [
        "R&D",
        "Innovation Services",
        "Scientific Research",
        "Product Development",
        "Research Institutions",
    ],
    "Maintenance Services": [
        "Maintenance",
        "Facility",
        "Property Maintenance",
        "Handyman Service",
        "Building Maintenance",
    ],
    "Other Services": [],
};

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

async function fetchCities() {
    const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/unique-town-city`
    );
    const data = await res.json();

    return data.uniqueTownCity;
}

function Sponsors() {
    const initialized = React.useRef(false);

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const [cities, setCities] = useState([]);
    const [cityInput, setCityInput] = useState("");

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
        const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL
            }/sponsors?search=${searchData}&city=${selectedCity}&category=${selectedCategory}`
        );
        const data = await res.json();

        console.log(data);
        setSearchResults(data);
    }

    const handleSearch = () => {
        // Handle search logic
        console.log("Searching for:", searchTerm);
        fetchData(searchTerm);
    };

    const toggleAdvancedSearch = () => {
        setShowAdvancedSearch(!showAdvancedSearch);
        setCityInput("");
        setSelectedCity("");
        setSelectedCategory("");
    }

    const handleClear = () => {
        setSearchTerm("");
        setCityInput("");
        setSelectedCity("");
        setSelectedCategory("");
        setSearchResults([]);
    };

    React.useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            fetchCities().then((data) => setCities(data));
        }
    }, []);

    return (
        <div className="w-full flex gap-8">
            <div className="flex flex-1 flex-col px-1 py-6 mt-6 mx-8">
                <h1 className="text-xl font-bold mb-2">
                    Search by company or business
                </h1>
                <hr className="w-full border-t-2 border-gray-300 mb-4" />
                <div className="lg:flex lg:items-end gap-4 w-full pr-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter company name ..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
                    />
                    <div className="flex gap-2 items-end justify-center mt-3 lg:mt-0 w-full">
                        <button
                            onClick={toggleAdvancedSearch}
                            className="bg-[#2f3c69] text-white px-4 py-2 min-w-fit rounded hover:bg-gray-800 focus:outline-none w-full"
                        >
                            {showAdvancedSearch ? "Hide" : "Show"} Advanced Search
                        </button>
                        <button
                            onClick={handleSearch}
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full"
                        >
                            Search
                        </button>
                        <button
                            onClick={handleClear}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none w-full"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                {showAdvancedSearch && <div className="w-full flex space-x-3 mt-4 pr-8">
                    <Popover className="w-full">
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between font-bold"
                            >
                                {selectedCity != "" ? selectedCity : "Select a city"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput onInput={(e) => setCityInput(e.target.value)} placeholder="Enter city..." className="h-9" />
                                <CommandList>
                                    {cityInput.length > 3 && <CommandEmpty>No City found.</CommandEmpty>}
                                    <CommandGroup>
                                        {cityInput.length > 3 && cities.map((city, index) => {
                                            if (city.toLowerCase().includes(cityInput.toLowerCase())) {
                                                return (
                                                    <CommandItem
                                                        key={`${city}${index}`}
                                                        value={city}
                                                        onSelect={(currentValue) => {
                                                            setSelectedCity(currentValue);
                                                            setCityInput("");
                                                        }}
                                                    >
                                                        {city}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                selectedCity === city ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                )
                                            }
                                        })}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="w-full font-bold">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(categories).map((category, index) => (
                                <SelectGroup key={`${category}${index}`}>
                                    <SelectLabel>{category}</SelectLabel>
                                    {categories[category].map((item, index) => (
                                        <SelectItem key={`${item}${index}`} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                </div>}

                <div className="mt-8 px-1">
                    <h2 className="text-md font-bold mb-2">
                        Register of sponsors -{" "}
                        {searchResults.count ? searchResults.count : 0} of{" "}
                        {searchResults.countTotal ? searchResults.countTotal : 0} companies
                    </h2>
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

                        <div className="flex flex-col gap-3">
                            {searchResults.sponsors &&
                                searchResults.sponsors.map((sponsor) => (
                                    <div
                                        key={sponsor._id}
                                        className="flex gap-2 bg-white px-2 rounded-md py-4 overflow-y-auto max-h-64"
                                    >
                                        <div
                                            className="w-2/5"
                                            onClick={() => {
                                                openModal(sponsor);
                                            }}
                                        >
                                            <h1 className="text-xl font-semibold underline underline-offset-4 cursor-pointer">
                                                {sponsor["Organisation Name"]}
                                            </h1>
                                        </div>
                                        <div className="w-1/4">
                                            <h3 className="text-sm font-light">{`${sponsor["Town/City"]
                                                }${sponsor["County"] ? `, ${sponsor["County"]}` : ""
                                                }`}</h3>
                                        </div>
                                        <div className="w-2/4">
                                            <h3 className="text-sm font-light">{`${sponsor["Type & Rating"]
                                                }${sponsor["Route"] ? ` - ${sponsor["Route"]}` : ""
                                                }`}</h3>
                                        </div>
                                    </div>
                                ))}
                            <Modal
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
}

export default Sponsors;
