import * as actionTypes from './type';

export const setUser = user => ({
    type: actionTypes.SET_USER,
    data: {
        currentUser: user,
    }
})

export const clearUser = () =>  ({
    type: actionTypes.CLEAR_USER,
})