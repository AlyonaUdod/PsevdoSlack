import * as actionTypes from '../actions/type'

const initialColorsState = {
    primaryColor: '#4c3c4c',
    secondaryColor: '#eee'
}

const colors = (state = initialColorsState, action) => {
    switch (action.type) {
        case actionTypes.SET_COLORS:
            return action.data
        default:
            return state
    }
}

export default colors