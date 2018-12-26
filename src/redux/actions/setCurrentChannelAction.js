import * as actionType from './type'

export const setCurrentChannel = channel => ({
    type: actionType.SET_CURRENT_CHANNEL,
    data: channel,
})

export const setPrivateChannel = isPrivatChannel => ({
    type: actionType.SET_PRIVATE_CHANNEL,
    data: isPrivatChannel
})