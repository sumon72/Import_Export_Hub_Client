import { useState } from "react";


const ExportImportSolution = () => {


    return (
        <>
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        Global Export & Import Solutions
                    </h1>
                    <p className="max-w-2xl mx-auto mb-10">
                        Expand your business beyond borders with our seamless product export and import management system — connecting you to the world.
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                image: "https://www.morethanshipping.com/wp-content/uploads/2015/04/iStock_000053559384_Medium.jpg",
                                title: "Worldwide Shipping",
                                description:
                                    "Ship your products across continents with our trusted international logistics partners.",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M9 21h6m2-11l2 9H5l2-9m7-5h-4v5h4V5z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                image: "https://images.unsplash.com/photo-1505839673365-e3971f8d9184?auto=format&fit=crop&w=600&q=80",
                                title: "Customs & Clearance",
                                description:
                                    "Handle documentation and clearance with ease — we ensure all regulations are met efficiently.",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6M5 10h14l1 6H4l1-6z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80",
                                title: "Real-Time Tracking",
                                description:
                                    "Stay updated with live shipment tracking and status updates for all your exports and imports.",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=600&q=80",
                                title: "Multi-Currency Support",
                                description:
                                    "Trade globally with automatic currency conversion and secure international payment options.",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-yellow-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-3.313 0-6 1.343-6 3s2.687 3 6 3 6-1.343 6-3-2.687-3-6-3z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14v4m0-8V6"
                                        />
                                    </svg>
                                ),
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
                            >
                                <figure>
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="h-40 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <div className="mb-3">{feature.icon}</div>
                                    <h2 className="card-title text-lg font-semibold">
                                        {feature.title}
                                    </h2>
                                    <p className="text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
};

export default ExportImportSolution;