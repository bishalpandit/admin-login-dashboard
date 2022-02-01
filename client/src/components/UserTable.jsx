import React, { useEffect, useCallback } from 'react';
import { listUsers, deleteUser } from '../redux/actions/users';
import { useSelector, useDispatch } from 'react-redux'
import { Alert, LinearProgress } from '@mui/material';



const UserTable = () => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const userDelete = useSelector(state => state.userDelete)
    const { success } = userDelete
    const { users, loading, error } = userList


    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
    }

    return (
        <div>
            {success && (<Alert severity='error'>User Deleted!</Alert>)}
            {
                loading ? (<LinearProgress />) :
                    error ? (<Alert severity='error'>Something went wrong!</Alert>) :

                        (
                            <div className="font-poppins flex flex-col max-w-xs md:max-w-2xl">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Name
                                                        </th >
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Mobile
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Address
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Delete User</span>
                                                        </th>
                                                    </tr >
                                                </thead >
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {users.map((person) => (
                                                        <tr key={person.email}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{person.username}</div>
                                                                        <div className="text-sm text-gray-500">{person.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{person.mobile}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{person.address}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button onClick={() => { deleteHandler(person._id) }} className="text-white bg-red-600/80 px-2 py-1 rounded-md hover:bg-red-600">
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table >
                                        </div >
                                    </div >
                                </div >
                            </div >
                        )
            }
        </div>
    )

};

export default UserTable;
