
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSequre from '../../../hooks/useAxiosSequre';
import { FiPackage } from 'react-icons/fi';

const PaymentHistory = () => {

    const { user } = useAuth()
    const axiosSuqure = useAxiosSequre()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSuqure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })

    const totalAmount = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

    return (
        <div className="animate-fade-up">
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-2xl font-black text-[var(--teal)]">Payment History</h2>
                    <p className="text-sm text-[var(--teal)]/50 font-medium">Review all your successful transactions and delivery costs.</p>
                </div>
                
                <div className="flex gap-4">
                    <div className="dashboard-card py-4 px-6 flex items-center gap-4 bg-gradient-to-br from-white to-[#f8faf4]">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--lime)]/10 flex items-center justify-center text-[var(--teal)] shadow-sm">
                            <span className="text-xl font-bold">$</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--teal)]/30">Total Spent</p>
                            <p className="text-xl font-black text-[var(--teal)]">${totalAmount}</p>
                        </div>
                    </div>
                    <div className="dashboard-card py-4 px-6 flex items-center gap-4 bg-gradient-to-br from-white to-[#f8faf4]">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--teal)]/5 flex items-center justify-center text-[var(--teal)] shadow-sm">
                            <span className="text-xl font-bold">#</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--teal)]/30">Transactions</p>
                            <p className="text-xl font-black text-[var(--teal)]">{payments.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pb-4">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th className="text-left w-16">#</th>
                            <th className="text-left">Transaction ID</th>
                            <th className="text-left">Amount</th>
                            <th className="text-left">Date & Time</th>
                            <th className="text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td className="font-bold text-[var(--teal)]/30">{index + 1}</td>
                                <td className="font-mono text-xs font-bold text-[var(--teal)]/60 bg-gray-50/50 py-1 px-2 rounded-md inline-block mt-3">{payment.transactionId}</td>
                                <td className="font-black text-[var(--teal)]">${payment.amount}</td>
                                <td className="text-sm font-medium text-[var(--teal)]/60">
                                    {payment.PaidAt ? new Date(payment.PaidAt).toLocaleString() : 'N/A'}
                                </td>
                                <td className="text-right">
                                    <span className="status-badge status-paid">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        Success
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {payments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white/40 rounded-[32px] border-2 border-dashed border-[var(--teal)]/5">
                    <div className="w-16 h-16 rounded-3xl bg-[var(--teal)]/5 flex items-center justify-center text-[var(--teal)]/10 mb-4">
                        <span className="text-3xl font-bold">$</span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--teal)]/40">No payment history</h3>
                    <p className="text-sm text-[var(--teal)]/30 mt-1">Your payment records will appear here after your first delivery.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;