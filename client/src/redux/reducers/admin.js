
export const adminLoginReducer = (prevState = {}, action) => {

    switch (action.type) {
        case 'ADMIN_LOGIN_REQUEST':
            return {
                loading: true,
            }
        case 'ADMIN_LOGIN_SUCCESS':
            return {
                loading: false,
                adminInfo: action.payload,
            }
        case 'ADMIN_LOGIN_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'ADMIN_LOGOUT':
            return {}
        default: return prevState
    }
}