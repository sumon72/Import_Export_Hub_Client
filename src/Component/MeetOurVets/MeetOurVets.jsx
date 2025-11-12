import { useState } from "react";
import { Stethoscope, Heart, Award } from "lucide-react";
import VetsData from '../../VetsData.json';

const MeetOurVets = () => {

    const iconMap = {
        stethoscope: <Stethoscope className="w-6 h-6 text-primary" />,
        heart: <Heart className="w-6 h-6 text-error" />,
        award: <Award className="w-6 h-6 text-secondary" />,
    };

    return (
        <>
            <section className="py-16">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        Meet Our Expert Vets
                    </h1>
                    <p className="max-w-2xl mx-auto mb-10">
                        Our dedicated veterinary professionals bring expertise, compassion,
                        and care to ensure your pets live their healthiest and happiest lives.
                    </p>

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {VetsData.map((vet, index) => (
                            <div
                                key={index}
                                className="card bg-white shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
                            >
                                <figure className="relative">
                                    <img
                                        src={vet.image}
                                        alt={vet.name}
                                        className="h-64 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-all flex items-center justify-center">
                                       {iconMap[vet.icon]}
                                    </div>
                                </figure>

                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-lg font-semibold">
                                        {vet.name}
                                    </h2>
                                    <p className="text-primary font-medium mb-2">{vet.role}</p>
                                    <p className="text-sm">{vet.bio}</p>
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