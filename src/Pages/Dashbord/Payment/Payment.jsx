import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSequre from '../../../hooks/useAxiosSequre';

const Payment = () => {
    const { parcelId } = useParams()

    const axiosSuqure = useAxiosSequre()

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSuqure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })

    const handelpayment = async()=>{
        const paymentInfo ={
            cost:parcel.cost,
            parcelId:parcel._id,
            senderEmail:parcel.senderEmail,
            parcelName:parcel.ParcelName
        }

        const res = await axiosSuqure.post('/create-checkout-session',paymentInfo)
        console.log(res.data);  
        window.location.href = res.data.url

    }

    if (isLoading) {
        return <span>loading....</span>
    }


    return (
        <div>
            <h2>plase pay ${parcel.cost} for :{parcel.ParcelName}</h2>

            <button onClick={handelpayment} className='btn btn-primary text-black'> pay</button>
        </div>
    );
};

export default Payment;