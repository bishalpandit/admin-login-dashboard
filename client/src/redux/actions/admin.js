import axios from 'axios'

export const adminLogin = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({
            type: 'ADMIN_LOGIN_REQUEST',
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/admin',
            { email, password },
            config
        )
        console.log(data);
        dispatch({
            type: 'ADMIN_LOGIN_SUCCESS',
            payload: data,
        })

        localStorage.setItem('adminInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: 'ADMIN_LOGIN_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const adminLogout = () => async (dispatch) => {

    dispatch({
        type: 'ADMIN_LOGOUT'
    })

    localStorage.removeItem('adminInfo')

}