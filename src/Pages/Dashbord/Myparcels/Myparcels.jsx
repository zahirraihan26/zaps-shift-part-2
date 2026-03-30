import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSequre from '../../../hooks/useAxiosSequre';
import { FiEdit, FiTrash, FiPackage } from 'react-icons/fi';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const Myparcels = () => {
    const { user } = useAuth()
    const axiosSuqure = useAxiosSequre()


    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSuqure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    const handelparcelDelete = id => {
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSuqure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data)

                        if (res.data.deletedCount) {
                            // refresh the data 
                            refetch()

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Parcel request has been deleted.",
                                icon: "success"
                            });

                        }
                    })

                // 
            }
        });
    }

    const handelPayment = async(parcel)=>{
       const paymentInfo ={
        cost:parcel.cost,
        parcelId:parcel._id,
        senderEmail: parcel.SenderEmail,
        parcelName:parcel.ParcelName
       }
     
       const res =await axiosSuqure.post('/payment-checkout-session',paymentInfo)
         console.log(res.data.url);
         window.location.assign(res.data.url) 
    }

    return (
        <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-[var(--teal)]">My Parcels</h2>
                    <p className="text-sm text-[var(--teal)]/50 font-medium">Manage and track your active delivery requests.</p>
                </div>
                <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-[var(--teal)]/5 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse" />
                    <span className="text-sm font-bold text-[var(--teal)]">{parcels.length} Active Requests</span>
                </div>
            </div>

            <div className="overflow-x-auto pb-4">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th className="text-left w-16">#</th>
                            <th className="text-left">Parcel Name</th>
                            <th className="text-left">Cost</th>
                            <th className="text-left">Payment</th>
                            <th className="text-left">Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td className="font-bold text-[var(--teal)]/30">{index + 1}</td>
                                <td className="font-bold">{parcel.ParcelName}</td>
                                <td className="font-bold text-[var(--teal)]/70">${parcel.cost}</td>
                                <td>
                                    {parcel.paymentStatus === 'paid' ? (
                                        <span className="status-badge status-paid">
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                            Paid
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handelPayment(parcel)}
                                            className="btn-zap bg-[var(--lime)]/10 text-[var(--teal)] text-[11px] py-1.5 px-4 hover:bg-[var(--lime)] border border-[var(--lime)]/30"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <span className={`status-badge ${
                                        parcel.deliveryStatus === 'delivered' ? 'status-delivered' :
                                        parcel.deliveryStatus === 'pending' ? 'status-pending' :
                                        'status-shippped'
                                    }`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        {parcel.deliveryStatus}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[var(--teal)]/40 hover:bg-[var(--lime)] hover:text-[var(--teal)] transition-all">
                                            <FaMagnifyingGlass size={14} />
                                        </button>
                                        <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[var(--teal)]/40 hover:bg-sky-50 hover:text-sky-600 transition-all">
                                            <FiEdit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handelparcelDelete(parcel._id)}
                                            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[var(--teal)]/40 hover:bg-red-50 hover:text-red-500 transition-all"
                                        >
                                            <FiTrash size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {parcels.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white/40 rounded-[32px] border-2 border-dashed border-[var(--teal)]/5">
                    <FiPackage size={48} className="text-[var(--teal)]/10 mb-4" />
                    <h3 className="text-lg font-bold text-[var(--teal)]/40">No parcels found</h3>
                    <p className="text-sm text-[var(--teal)]/30 mt-1">Start by sending your first parcel!</p>
                    <Link to="/send-percel" className="btn-zap btn-primary-zap mt-6 scale-90">
                        Send Parcel
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Myparcels;