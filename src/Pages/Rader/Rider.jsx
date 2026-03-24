import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSequre from '../../hooks/useAxiosSequre';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router';

const Rider = () => {
     const { register,
            handleSubmit,
            control,
            // formState: { errors }
        } = useForm()
            const { user } = useAuth()
    const axiosSecqute = useAxiosSequre()

     const serviceSenters = useLoaderData()
    const regionsDuplicate = serviceSenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
      
    // explore useMemo usecallback
    const districtByRegion = (region) => {
        const regionDistricts = serviceSenters.filter(c => c.region ===
            region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }

    const raiderRegion = useWatch({ control, name: 'region' })


    const handelRiderApplication = (data) => {
        console.log(data)
        axiosSecqute.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Rider Application submitted successfully')
                }
            })
    }



    return (
        <div>
            <h2 className="text-4xl text-primary">Be a Raider</h2>
            <form onSubmit={handleSubmit(handelRiderApplication)} className='mt-12 p-4 text-black' >
                
           
                {/* two cols */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-8'>
                    {/* Raider Details*/}

                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-samebold">Raider details</h4>
                        {/* Raider name */}
                        <label className="label ">Raider Name</label>
                        <input type="text"{...register('name')}
                            defaultValue={user?.displayName}
                            className="input w-full"
                            placeholder=" Name" />

                        {/* Raider Email */}
                        <label className="label "> Email</label>
                        <input type="email"{...register('email')}
                            defaultValue={user?.email}
                            className="input w-full"
                            placeholder=" Email" />

                        {/* Raider region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend"> Regions</legend>

                            <select
                                {...register('region')}
                                defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>


                        {/* Raider districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend"> Districts</legend>

                            <select
                                {...register('district')}
                                defaultValue="Pick a  district" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(raiderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }


                            </select>

                        </fieldset>


                        {/* Raider address */}
                        <label className="label mt-4">Your Address</label>
                        <input type="text"{...register('address')} className="input w-full"
                            placeholder=" Address" />


                    </fieldset>

                    {/* Recevier info  */}


                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-samebold">More details</h4>
                        {/* Recevier name */}
                        <label className="label ">Driving License </label>
                        <input type="text"{...register('license')} className="input w-full"
                            placeholder="Driving License" />

                        {/*  Recevier Email */}
                        <label className="label "> NID</label>
                        <input type="text"{...register(' nid')} className="input w-full"
                            placeholder=" NID" />

                      


                        {/*BIKE */}
                        <label className="label mt-4">BIKE</label>
                        <input type="text"{...register('bike')} className="input w-full"
                            placeholder="BIKE" />


                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary mt-8 text-black' value="Apply AS A Raider" />
            </form>
        </div>
    );
};

export default Rider;