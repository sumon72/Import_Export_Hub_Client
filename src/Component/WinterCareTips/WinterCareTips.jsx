import { useState } from "react";
import WinterCareTipsData from '../../WinterCareTipsData.json';

const WinterCareTips = () => {


    return (
        <>
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        Winter Care Tips for Pets
                    </h1>
                    <p className="max-w-2xl mx-auto mb-10">
                        Keep your furry friends happy and healthy during the cold season with these essential winter care tips.
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {WinterCareTipsData.map((tip, index) => (
                            <div
                                key={index}
                                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
                            >
                                <figure>
                                    <img
                                        src={tip.image}
                                        alt={tip.title}
                                        className="h-40 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <div className="mb-3">{tip.icon}</div>
                                    <h2 className="card-title text-lg font-semibold">{tip.title}</h2>
                                    <p className="text-sm">{tip.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
};

export default WinterCareTips;