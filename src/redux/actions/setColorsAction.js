import * as actionType from './type'

export const setColors = (a, b) => ({
    type: actionType.SET_COLORS,
    data: {
        primaryColor: a,
        secondaryColor: b,
    },
})