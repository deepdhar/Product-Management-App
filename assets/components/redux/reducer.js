import {ADD_TO_DB, REMOVE_FROM_DB, SIGN_UP} from './constants';
const initialState = [];

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_TO_DB:
            return [
                ...state,
                action.data
            ]
        case REMOVE_FROM_DB:
            let result = state.filter(item=>{
                return item.title != action.data
            })
            return [...result]
        case SIGN_UP:
            return [
                ...state,
                action.data
            ]
        default:
            return state
    }
}