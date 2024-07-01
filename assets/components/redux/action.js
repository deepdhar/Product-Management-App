import {ADD_TO_DB, REMOVE_FROM_DB, SIGN_UP} from './constants'

export function addToDb(item) {
    return {
        type: ADD_TO_DB,
        data: item
    }
}

export function removeFromDb(item) {
    return {
        type: REMOVE_FROM_DB,
        data: item
    }
}

export function getUserSignedUp(res) {
    return {
        type: SIGN_UP,
        data: res
    }
}