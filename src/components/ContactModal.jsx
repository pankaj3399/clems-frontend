import { useState } from "react";
import axios from "axios";

export default function ({
    isOpen,
    closeModal,
}) {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        shortInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const data = {
            name: formData.name,
            email: formData.email,
            contactInfo: formData.contact,
            shortInfo: formData.shortInfo
        };
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/contact-form`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (res.status === 200) {
                setSubmitting(false);
                alert('Contact details submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    contact: '',
                    shortInfo: ''
                });
                closeModal();
            }
        } catch (error) {
            console.error(error);
        }
    };


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
                    <form onSubmit={handleSubmit} className="max-w-lg bg-white">
                        <h2 className="text-2xl text-center font-bold mb-4">User Information Form</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="text-gray-700">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-gray-700">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact" className="text-gray-700">Contact Information:</label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="shortInfo" className="text-gray-700">Short Info:</label>
                            <textarea
                                id="shortInfo"
                                name="shortInfo"
                                rows="5"
                                value={formData.shortInfo}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg h-40 overflow-auto resize-none"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">{submitting ? "Processing" : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};