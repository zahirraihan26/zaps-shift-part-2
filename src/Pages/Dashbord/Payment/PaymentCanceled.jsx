import React from 'react';
import { Link } from 'react-router';

const PaymentCanceled = () => {
    return (
         <div>
            <h2>Payment is cancelled plese Try Again</h2>
            <Link to='/dashboard/my-parcels'>
            <button className='btn btn-primary text-black'>Try again</button></Link>
        </div>
    );
};

export default PaymentCanceled;