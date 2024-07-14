import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import uploadFile from '../helpers/uploadFile'
import Divider from './Divider';

const EditUserDetails = ({ onClose, user }) => {

    const [data, setData] = useState({
        name: user?.user,
        profile_pic: user?.profile_pic
    })

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                ...user,
            }
        })
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0]

        const uploadPhoto = await uploadFile(file)

        setData((preve) => {
            return {
                ...preve,
                profile_pic: uploadPhoto?.url
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className='flex top-0 bottom-0 right-0 left-0 bg-gray-700 bg-opacity-40 justify-center items-center'>
            <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-sm'>Edit User Details</p>

                <form action="" className='grid gap-3 mt-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name='name' id='name' value={data?.name} onChange={handleOnChange} className='w-full py-1 px-2 focus:outline-primary border border-0.5' />
                    </div>

                    <div>
                        <div className='my-1 flex items-center gap-3'>
                            <Avatar width={40} height={40} imageUrl={data?.profile_pic} name={data?.name} />
                            <label htmlFor='profile_pic'>
                                <button className='font-semibold' >Change Photo</button>
                                <input
                                    type='file'
                                    id='profile_pic'
                                    className='hidden'
                                    onChange={handleUploadPhoto}
                                />
                            </label>
                        </div>
                    </div>
                    <Divider />
                    <div className='flex gap-2 w-fit ml-auto '>
                        <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                        <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

EditUserDetails.propTypes = {
    onClose: PropTypes.func,
    user: PropTypes.string,
};

export default React.memo(EditUserDetails)