import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSequre from '../../hooks/useAxiosSequre';
import useAuth from '../../hooks/useAuth';

const Sendpercel = () => {
    const { register,
        handleSubmit,
        control,
        // formState: { errors }
    } = useForm()

    const { user } = useAuth()
    const axiosSecqute = useAxiosSequre()
    const navigate = useNavigate()


    const serviceSenters = useLoaderData()
    const regionsDuplicate = serviceSenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })


    const districtByRegion = (region) => {
        const regionDistricts = serviceSenters.filter(c => c.region ===
            region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }



    const handelsendPercel = data => {
        console.log(data)
        const isDocument = data.percelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        const parcelWeight = parseFloat(data.ParcelWeight)
        let cost = 0
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150
                const extraWeight = parcelWeight - 3
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40

                cost = minCharge + extraCharge

            }
        }

        console.log('cost', cost)
        data.cost = cost

        Swal.fire({
            title: "Agree with the cost",
            text: `You Will be charged ${cost} Taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "confirm"
        }).then((result) => {
            if (result.isConfirmed) {

                // save parcel user data base 
                axiosSecqute.post('/parcels', data)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "parcel has created . please proceed to payment",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })

                //

            }
        });

    }


    return (
        <div>
            <h2 className="text-bold text-5xl ">Send A Parcel</h2>

            <form onSubmit={handleSubmit(handelsendPercel)} className='mt-12 p-4 text-black' >
                {/* persel type */}
                <div>
                    <label className="label mr-4">
                        <input type="radio"{...register('ParcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>

                    <label className="label">
                        <input type="radio"{...register('ParcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>
                {/* price info:name weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-8'>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text"{...register('ParcelName')} className="input w-full"
                            placeholder="Parcel name" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number"{...register('ParcelWeight')} className="input w-full"
                            placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                {/* two cols */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-8'>
                    {/* sender Details*/}

                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-samebold">Sender details</h4>
                        {/* sender name */}
                        <label className="label ">Sender Name</label>
                        <input type="text"{...register('SenderName')}
                            defaultValue={user?.displayName}
                            className="input w-full"
                            placeholder="Sender Name" />

                        {/* sender Email */}
                        <label className="label ">Sender Email</label>
                        <input type="email"{...register('SenderEmail')}
                            defaultValue={user?.email}
                            className="input w-full"
                            placeholder="Sender Email" />

                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>

                            <select
                                {...register('senderRegion')}
                                defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>


                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>

                            <select
                                {...register('senderDistrict')}
                                defaultValue="Pick a  district" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>


                        {/* sender address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text"{...register('SenderAddress')} className="input w-full"
                            placeholder="Sender Address" />


                    </fieldset>

                    {/* Recevier info  */}


                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-samebold">Recevier details</h4>
                        {/* Recevier name */}
                        <label className="label ">Recevier Name</label>
                        <input type="text"{...register('RecevierName')} className="input w-full"
                            placeholder="Recevier Name" />

                        {/*  Recevier Email */}
                        <label className="label "> Recevier Email</label>
                        <input type="email"{...register(' RecevierEmail')} className="input w-full"
                            placeholder=" RecevierEmail" />

                        {/* Recever region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recevier Regions</legend>

                            <select
                                {...register('receiverRegion')}
                                defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>


                        {/* Recever district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recevier District</legend>

                            <select
                                {...register('receiverDistrict')}
                                defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }


                            </select>

                        </fieldset>


                        {/* Recevier address */}
                        <label className="label mt-4">Recevier Address</label>
                        <input type="text"{...register('RecevierAddress')} className="input w-full"
                            placeholder="Sender Address" />


                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary mt-8 text-black' value="Send Parcel" />
            </form>
        </div>
    );
};

export default Sendpercel;