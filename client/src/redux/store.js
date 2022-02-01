import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { adminLoginReducer } from './reducers/admin';
import { userListReducer, userDeleteReducer, userCreateReducer } from './reducers/users';

const reducer = combineReducers({
    admin: adminLoginReducer,
    userList: userListReducer,
    userCreate: userCreateReducer,
    userDelete: userDeleteReducer,
});

const adminInfoFromStorage = localStorage.getItem('adminInfo') ? JSON.parse(
    localStorage.getItem('adminInfo')) : null

const initialState = {
    admin: {
        adminInfo: adminInfoFromStorage
    }
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;