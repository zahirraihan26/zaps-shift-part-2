import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocalLogin from '../SocalLogin/SocalLogin';
import axios from 'axios';
import useAxiosSequre from '../../../hooks/useAxiosSequre';
import { FiUser, FiMail, FiLock, FiImage, FiArrowRight } from 'react-icons/fi';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navgate = useNavigate();
    const axiosSuqure = useAxiosSequre();

    const handelregistation = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                // store the img and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_Key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        };
                        axiosSuqure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user created in database");
                                }
                            });

                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log("user profile update Done");
                                navgate(location.state || "/");
                            })
                            .catch(error => console.log(error));
                    });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="premium-card p-8 sm:p-10 w-full max-w-md mx-auto relative group overflow-visible my-12 animate-fade-up">
             {/* Decorative lime accent */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--lime)]/15 rounded-bl-[60px] pointer-events-none transition-all duration-500 group-hover:bg-[var(--lime)]/25 group-hover:w-40 group-hover:h-40 group-hover:rounded-bl-[80px] animate-pulse-glow" />

            {/* Heading */}
            <div className="mb-8 relative z-10">
                <span className="section-tag">🚀 Join ZapShift</span>
                <h1 className="text-2xl font-extrabold text-[var(--teal)] mt-3">Create an Account</h1>
                <p className="text-[var(--teal)]/55 text-sm mt-1">Get started with Bangladesh's premier delivery network.</p>
            </div>

            <form onSubmit={handleSubmit(handelregistation)} className="flex flex-col gap-4 relative z-10">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--teal)]">Full Name</label>
                    <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--teal)]/40" size={16} />
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--teal)]/15 bg-white text-[var(--teal)] text-sm font-medium placeholder:text-[var(--teal)]/30 focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/30 transition-all"
                        />
                    </div>
                    {errors.name?.type === 'required' && <p className="text-red-500 text-xs font-medium">Name is required</p>}
                </div>

                {/* Photo */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--teal)]">Profile Photo</label>
                    <div className="relative">
                         <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--teal)]/40" size={16} />
                        <input
                            type="file"
                            {...register('photo', { required: true })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--teal)]/15 bg-white text-[var(--teal)] text-sm font-medium file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--lime)]/20 file:text-[var(--teal)] hover:file:bg-[var(--lime)]/40 focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/30 transition-all"
                        />
                    </div>
                    {errors.photo?.type === 'required' && <p className="text-red-500 text-xs font-medium">Photo is required</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--teal)]">Email Address</label>
                    <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--teal)]/40" size={16} />
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--teal)]/15 bg-white text-[var(--teal)] text-sm font-medium placeholder:text-[var(--teal)]/30 focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/30 transition-all"
                        />
                    </div>
                    {errors.email?.type === 'required' && <p className="text-red-500 text-xs font-medium">Email is required</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[var(--teal)]">Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--teal)]/40" size={16} />
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            placeholder="Min. 6 characters"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--teal)]/15 bg-white text-[var(--teal)] text-sm font-medium placeholder:text-[var(--teal)]/30 focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/30 transition-all"
                        />
                    </div>
                    {errors.password?.type === 'minLength' && <p className="text-red-500 text-xs font-medium">Password must be at least 6 characters</p>}
                    {errors.password?.type === 'required' && <p className="text-red-500 text-xs font-medium">Password is required</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn-zap btn-primary-zap w-full justify-center mt-3 py-3"
                >
                    Create Account <FiArrowRight size={16} />
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6 relative z-10">
                <div className="flex-1 h-px bg-[var(--teal)]/10" />
                <span className="text-xs font-medium text-[var(--teal)]/40">or register with</span>
                <div className="flex-1 h-px bg-[var(--teal)]/10" />
            </div>

            <div className="relative z-10">
                <SocalLogin />
            </div>

            <p className="text-center text-sm text-[var(--teal)]/55 mt-6 relative z-10">
                Already have an account?{' '}
                <Link state={location.state} to="/login" className="font-bold text-[var(--teal)] hover:text-[var(--lime-dark)] transition-colors">
                    Sign in →
                </Link>
            </p>
        </div>
    );
};

export default Register;
