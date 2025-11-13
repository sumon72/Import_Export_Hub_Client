import { useState } from "react";
import { Stethoscope, Heart, Award } from "lucide-react";


const MeetOurVets = () => {


    return (
        <>
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        Meet Our Logistics Experts
                    </h1>
                    <p className="max-w-2xl mx-auto mb-10">
                        Our experienced C&F professionals ensure smooth handling, timely delivery,
                        and efficient supply chain management for your goods worldwide.
                    </p>

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                name: "Rahim Ahmed",
                                role: "Senior Logistics Manager",
                                bio: "Over 10 years of experience managing import/export operations and warehouse coordination.",
                                image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M9 21h6m2-11l2 9H5l2-9m7-5h-4v5h4V5z" />
                                    </svg>
                                ),
                            },
                            {
                                name: "Salma Khatun",
                                role: "Customs Clearance Specialist",
                                bio: "Expert in international trade documentation and smooth customs handling.",
                                image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6MkgRysQsbtYo12zPuoJ61/bc3d625ed352b8bc9bc2565e48c3d490/GettyImages-1316073405.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                                    </svg>
                                ),
                            },
                            {
                                name: "Imran Hossain",
                                role: "Supply Chain Coordinator",
                                bio: "Specializes in coordinating shipments, tracking, and delivery optimization.",
                                image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1mKA26uqOHJn4hEAN7GKfr/455c8cf25e53fd6242270611ac6e7329/GettyImages-1408631315.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />
                                    </svg>
                                ),
                            },
                        ].map((staff, index) => (
                            <div
                                key={index}
                                className="card bg-white shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
                            >
                                <figure className="relative">
                                    <img
                                        src={staff.image}
                                        alt={staff.name}
                                        className="h-64 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-all flex items-center justify-center">
                                        {staff.icon}
                                    </div>
                                </figure>

                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-lg font-semibold">{staff.name}</h2>
                                    <p className="text-primary font-medium mb-2">{staff.role}</p>
                                    <p className="text-sm">{staff.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
};

export default MeetOurVets;