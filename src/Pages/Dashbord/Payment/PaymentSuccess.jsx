import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSequre from '../../../hooks/useAxiosSequre';

const PaymentSuccess = () => {
    const [SearchParams] = useSearchParams()

    const [paymentInfo, setPaymentInfo] = useState({});

    const sessionId = SearchParams.get('session_id')
    const axiosSuqure = useAxiosSequre()


    console.log(sessionId);

    useEffect(() => {

        if (sessionId) {
            axiosSuqure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trakingId: res.data.trakingId
                    })
                })
        }

    }, [sessionId, axiosSuqure])


    return (
        <div>
            <h2 className="text-4xl">payment successful</h2>
            <p>Your transactionId:{paymentInfo.transactionId} </p>
        <p>Your Parcel Traking Id :{paymentInfo.trakingId}</p>
        </div>
    );
};

export default PaymentSuccess;