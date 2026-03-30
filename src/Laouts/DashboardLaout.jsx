import React, { useState } from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaMotorcycle, FaRegCreditCard } from 'react-icons/fa6';
import { FiHome, FiSettings, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

const DashboardLaout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    const navItems = [
        { to: '/', icon: <FiHome size={18} />, label: 'Homepage', end: true },
        { to: '/dashboard/my-parcels', icon: <CiDeliveryTruck size={18} />, label: 'My Parcels' },
        { to: '/dashboard/payment-history', icon: <FaRegCreditCard size={18} />, label: 'Payment History' },
        { to: '/dashboard/approve-riders', icon: <FaMotorcycle size={18} />, label: 'Approve Riders' },
    ];

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            isActive
                ? 'sidebar-item-active'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
        }`;

    return (
        <div className="min-h-screen flex bg-[#f0f5eb]">

            {/* Sidebar overlay (mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed z-40 top-0 left-0 h-full w-64 flex flex-col transition-transform duration-300 ease-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static lg:flex`}
                style={{ background: 'linear-gradient(160deg, var(--teal) 0%, #032b30 100%)' }}
            >
                {/* Logo area */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--lime)] flex items-center justify-center">
                            <span className="text-[var(--teal)] font-black text-sm">Z</span>
                        </div>
                        <span className="text-white font-extrabold text-lg tracking-tight">ZapShift</span>
                    </Link>
                    <button
                        className="lg:hidden text-white/60 hover:text-white transition"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* User profile mini */}
                {user && (
                    <div className="px-5 py-4 border-b border-white/8">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full border-2 border-[var(--lime)]/50 overflow-hidden bg-[var(--teal)]">
                                {user.photoURL
                                    ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                                    : <div className="w-full h-full flex items-center justify-center text-[var(--lime)]"><FiUser size={16} /></div>
                                }
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm truncate">{user.displayName || 'User'}</p>
                                <p className="text-white/40 text-xs truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nav */}
                <nav className="flex-1 px-4 py-5 flex flex-col gap-1 overflow-y-auto">
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-4 mb-2">Navigation</p>
                    {navItems.map(item => (
                        <NavLink key={item.to} to={item.to} end={item.end} className={navItemClass}>
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}

                    <div className="h-px bg-white/10 my-4" />
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-4 mb-2">Account</p>
                    <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200">
                        <FiSettings size={18} />
                        Settings
                    </button>
                </nav>

                {/* Footer badge */}
                <div className="px-5 py-4 border-t border-white/8">
                    <div className="bg-[var(--lime)]/10 border border-[var(--lime)]/20 rounded-xl px-4 py-3">
                        <p className="text-[var(--lime)] text-xs font-bold">⚡ ZapShift Dashboard</p>
                        <p className="text-white/40 text-[11px] mt-0.5">All your deliveries, in one place.</p>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top nav */}
                <header className="glass border-b border-[var(--lime)]/15 sticky top-0 z-20">
                    <div className="flex items-center gap-4 px-4 sm:px-6 h-14">
                        <button
                            className="lg:hidden p-2 text-[var(--teal)] hover:bg-[var(--lime)]/20 rounded-xl transition"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu size={20} />
                        </button>
                        <h1 className="font-extrabold text-[var(--teal)] text-base">Dashboard</h1>
                        <div className="ml-auto flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse-glow" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--teal)]/40">Network Live</span>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-[var(--teal)]/10 mx-2" />
                            <button className="w-9 h-9 rounded-xl glass border-[var(--lime)]/30 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--lime)]/20 transition-all">
                                <FiSettings size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLaout;