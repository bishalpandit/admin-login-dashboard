
export const userListReducer = (prevState = { users: [] }, action) => {

    switch (action.type) {
        case 'USERLIST_REQUEST':
            return {
                loading: true,
            }
        case 'USERLIST_SUCCESS':
            return {
                loading: false,
                users: action.payload,
            }
        case 'USERLIST_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default: return prevState
    }
}

export const userCreateReducer = (prevState = {}, action) => {
    switch (action.type) {
        case 'USER_CREATE_REQUEST':
            return { loading: true }
        case 'USER_CREATE_SUCCESS':
            return { loading: false, success: true, user: action.payload }
        case 'USER_CREATE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_CREATE_RESET':
            return {}
        default:
            return prevState
    }
}

export const userDeleteReducer = (prevState = {}, action) => {

    switch (action.type) {
        case 'USER_DELETE_REQUEST':
            return { loading: true }
        case 'USER_DELETE_SUCCESS':
            return { loading: false, success: true }
        case 'USER_DELETE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_DELETE_RESET':
            return {}
        default: return prevState
    }
}