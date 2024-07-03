import { useState } from "react";
import axios from "axios";

export default function ({
    isOpen,
    closeModal,
    name,
}) {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            companyName: name
        };
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/follow-company`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.status === 200) {
                setEmail("");
                closeModal();
            }
        } catch (error) {
            console.error(error);
        }
    }

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
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center font-bold p-2">Follow this company for more updates in the future!</h1>
                        <div className="flex py-2">
                            <input type="checkbox" name="terms" id="terms" required className="w-6 h-6 border border-black" />
                            <label htmlFor="terms" className="font-medium pl-2">I confirm that I have read the Privacy Policy and I agree to the website Terms of Use and License Agreement</label>
                        </div>
                        <div className="flex py-2">
                            <input type="checkbox" name="agree" id="agree" required className="w-6 h-6 border border-black" />
                            <label htmlFor="agree" className="font-medium pl-2">I understand that they do not, in any way, replace immigration advice</label>
                        </div>
                        <input
                            type="email"
                            className="w-full p-2 mt-4 border border-gray-300 rounded-lg"
                            placeholder="Enter your email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex justify-between items-center mt-4">
                            <button type="submit" className="p-2 hover:bg-blue-950 bg-blue-900 text-white rounded-lg">
                                Subscribe Now
                            </button>
                            <p className="underline underline-offset-2 text-blue-500 hover:text-blue-600 cursor-pointer" onClick={closeModal}>No, Thanks</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};