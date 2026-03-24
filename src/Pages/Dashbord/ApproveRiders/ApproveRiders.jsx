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
        <div>
            <h2 className="text-5xl">Riders pending Approvial:{riders.length} </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>district</th>
                            <th>status</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ?
                                        'text-green-800' : 'text-red-500'}`}>{rider.status}</p>
                                </td>
                                <td>
                                    <button onClick={() => handelApprovol(rider)} className='btn '>
                                        <FaUserCheck></FaUserCheck>
                                    </button>

                                    <button onClick={()=>handelReject(rider)} className='btn '>
                                        <IoPersonRemove></IoPersonRemove>
                                    </button>
                                    <button className='btn '>
                                        <FaTrash></FaTrash>
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;