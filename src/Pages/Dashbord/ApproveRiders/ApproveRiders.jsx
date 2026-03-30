import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSequre from '../../../hooks/useAxiosSequre';
import { FaTrash, FaUserCheck } from 'react-icons/fa6';
import { IoPersonRemove } from 'react-icons/io5';

const ApproveRiders = () => {
    const axiosSecqute = useAxiosSequre()
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecqute.get('/riders')
            return res.data
        }
    })


    const updateRiderstatus = (rider, status) => {
        const updateInfo = { status: status ,email:rider.email}
        axiosSecqute.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    alert(`Rider status is set to ${status}`)
                }
            })

    }

    const handelApprovol = rider => {
        updateRiderstatus(rider, 'approved')
    }

    const handelReject = rider => {
        updateRiderstatus(rider, 'rejected')
    }

    return (
        <div className="animate-fade-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-[var(--teal)]">Approve Riders</h2>
                    <p className="text-sm text-[var(--teal)]/50 font-medium">Manage and review incoming rider applications.</p>
                </div>
                <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-[var(--teal)]/5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-sm font-bold text-[var(--teal)]">{riders.length} Pending Applications</span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pb-4">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th className="text-left w-16">#</th>
                            <th className="text-left">Rider Information</th>
                            <th className="text-left">District</th>
                            <th className="text-left">Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td className="font-bold text-[var(--teal)]/30">{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--teal)]/5 flex items-center justify-center text-[var(--teal)]/40 font-bold">
                                            {rider.name?.[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{rider.name}</p>
                                            <p className="text-xs text-[var(--teal)]/40 font-medium">{rider.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold text-sm text-[var(--teal)]/70">
                                    <span className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-[var(--lime)]" />
                                        {rider.district}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${
                                        rider.status === 'approved' ? 'status-delivered' : 
                                        rider.status === 'rejected' ? 'status-returned' : 
                                        'status-pending'
                                    }`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        {rider.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handelApprovol(rider)}
                                            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[var(--lime)] hover:text-[var(--teal)] transition-all"
                                            title="Approve Rider"
                                        >
                                            <FaUserCheck size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handelReject(rider)}
                                            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-600 transition-all"
                                            title="Reject Rider"
                                        >
                                            <IoPersonRemove size={16} />
                                        </button>
                                        <button 
                                            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                                            title="Delete Application"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {riders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white/40 rounded-[32px] border-2 border-dashed border-[var(--teal)]/5">
                    <div className="w-16 h-16 rounded-3xl bg-[var(--teal)]/5 flex items-center justify-center text-[var(--teal)]/10 mb-4">
                        <FaUserCheck size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--teal)]/40">No pending applications</h3>
                    <p className="text-sm text-[var(--teal)]/30 mt-1">All rider requests have been processed.</p>
                </div>
            )}
        </div>
    );
};

export default ApproveRiders;