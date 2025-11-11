import React, { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth, firestore } from "../../firebase/firebase.init";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from "../../context/AuthContext.jsx";
import toast from 'react-hot-toast';
import Loader from "../../Component/Loader/Loader.jsx"

const MyProfile = () => {
    const { user, refreshUser } = useAuth();
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            setName(user.displayName || '');
            setEmail(user.email || '');
            setPhotoURL(user.photoURL || '');

            try {
                const userDoc = doc(firestore, 'users', user.uid);
                const snap = await getDoc(userDoc);
                if (snap.exists()) {
                    const data = snap.data();
                    if (data.name && !user.displayName) setName(data.name);
                    if (data.photoURL && !user.photoURL) setPhotoURL(data.photoURL);
                }
            } catch (err) {
                toast.error('Error fetching user Firestore doc:', err);
            }
        };

        fetchUserData();
    }, [user]);


    async function handleUpdate(e) {
        e.preventDefault();
        if (!user) return toast.success("No user signed in!");
        setSaving(true);
        try {

            await updateProfile(auth.currentUser, {
                displayName: name || undefined,
                photoURL: photoURL || undefined,
            });


            const userDocRef = doc(firestore, 'users', user.uid);
            await setDoc(
                userDocRef,
                {
                    name: name || null,
                    email: email || null,
                    photoURL: photoURL || null,
                    updatedAt: new Date(),
                },
                { merge: true }
            );
            await refreshUser();
            toast.success('Profile updated successfully!');

        } catch (err) {
            toast.error('Failed to update profile: ' + (err.message || err));
        } finally {
            setSaving(false);
          
        }
    }

    

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary text-center">My Profile</h2>

                <form onSubmit={handleUpdate}>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <div className="avatar">
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md overflow-hidden">
                                    {photoURL ? (
                                        <img src={photoURL} alt="User avatar" className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 rounded-full">
                                            No Image
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Profile Fields */}
                        <div className="flex-1 w-full md:w-2/3">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-medium">Image Link (URL)</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="https://your-image-link.com"
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-medium">Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full bg-gray-50"
                                    value={email}
                                    disabled
                                />
                            </div>

                            <div className="pt-4 flex justify-center md:justify-start">
                                <button
                                    type="submit"
                                    className={`btn btn-primary rounded-sm w-full md:w-auto`}
                                    disabled={saving}
                                >
                                    {saving ? <Loader /> : 'Update Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default MyProfile;
