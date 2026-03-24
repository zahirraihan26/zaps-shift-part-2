
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSequre from '../../../hooks/useAxiosSequre';

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

    return (
        <div>
            <h2 className="text5xl">Payment history:{payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Paid Time</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>Cy Ganderton</td>
                                <td>{payment.amount}</td>
                                <td>{payment.PaidAt}</td>
                                <td>{payment.transactionId}</td>
                            </tr>)
                        }
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;