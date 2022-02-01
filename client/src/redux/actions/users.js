import axios from 'axios'
import { adminLogout } from './admin'

export const listUsers = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: 'USERLIST_REQUEST'
        })

        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

        const config = {
            headers: {
                'Content-Type': 'applicatin/json',
                'Authorization': `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users`, config
        )

        dispatch({
            type: 'USERLIST_SUCCESS',
            payload: data,
        })

    } catch (error) {

        if(error.includes('invalid token')) {
            dispatch(adminLogout())
            return;
        }

        dispatch({
            type: 'USERLIST_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const createUser = ({ username, email, address, mobile }) => async (dispatch, getState) => {

    try {

        dispatch({
            type: 'USER_CREATE_REQUEST'
        })

        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/users/create', { username, email, mobile, address }, config
        )

        dispatch({
            type: 'USER_CREATE_SUCCESS',
            payload: data
        })

        dispatch(listUsers())

        setTimeout(() => {
            dispatch({
                type: 'USER_CREATE_RESET'
            })
        }, 3000)


    } catch (error) {

        if(error.includes('invalid token')) {
            dispatch(adminLogout())
            return;
        }

        dispatch({
            type: 'USER_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

        setTimeout(() => {
            dispatch({
                type: 'USER_CREATE_RESET'
            })
        }, 3000)
    }
}

export const deleteUser = (id) => async (dispatch) => {

    try {

        dispatch({
            type: 'USER_DELETE_REQUEST'
        })

        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminInfo.token}`
            }
        }

        await axios.delete(
            `/api/users/delete/${id}`, config
        )

        dispatch(listUsers())

        dispatch({
            type: 'USER_DELETE_SUCCESS',
        })


        setTimeout(() => {
            dispatch({
                type: 'USER_DELETE_RESET'
            })
        }, 3000)

    } catch (error) {

        dispatch({
            type: 'USER_DELETE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}