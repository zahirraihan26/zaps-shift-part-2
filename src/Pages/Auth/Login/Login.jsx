import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocalLogin from '../SocalLogin/SocalLogin';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInuser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handelLogin = (data) => {
        signInuser(data.email, data.password)
            .then(result => {
                navigate(location?.state || '/');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="premium-card p-8 sm:p-10">
            {/* Heading */}
            <div className="mb-8">
                <span className="section-tag">👋 Welcome back</span>
                <h1 className="text-2xl font-extrabold text-[var(--teal)] mt-3">Sign in to ZapShift</h1>
                <p className="text-[var(--teal)]/55 text-sm mt-1">Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleSubmit(handelLogin)} className="flex flex-col gap-5">
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
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500 text-xs font-medium">Email is required</p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-[var(--teal)]">Password</label>
                        <a href="#" className="text-xs font-semibold text-[var(--teal)]/50 hover:text-[var(--teal)] transition-colors">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--teal)]/40" size={16} />
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            placeholder="Min. 6 characters"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--teal)]/15 bg-white text-[var(--teal)] text-sm font-medium placeholder:text-[var(--teal)]/30 focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime)]/30 transition-all"
                        />
                    </div>
                    {errors.password?.type === 'minLength' && (
                        <p className="text-red-500 text-xs font-medium">Password must be at least 6 characters</p>
                    )}
                    {errors.password?.type === 'required' && (
                        <p className="text-red-500 text-xs font-medium">Password is required</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn-zap btn-primary-zap w-full justify-center mt-2 py-3"
                >
                    Sign In <FiArrowRight size={16} />
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-[var(--teal)]/10" />
                <span className="text-xs font-medium text-[var(--teal)]/40">or continue with</span>
                <div className="flex-1 h-px bg-[var(--teal)]/10" />
            </div>

            <SocalLogin />

            <p className="text-center text-sm text-[var(--teal)]/55 mt-6">
                New to ZapShift?{' '}
                <Link state={location.state} to="/register" className="font-bold text-[var(--teal)] hover:text-[var(--lime-dark)] transition-colors">
                    Create an account →
                </Link>
            </p>
        </div>
    );
};

export default Login;