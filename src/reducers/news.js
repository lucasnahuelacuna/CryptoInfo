import { NEWS12, NEWS6 } from "../constants";

const newsReducer = (state={ news6: [], news12: [] }, action) => {
    switch(action.type) {
        case NEWS6:
            return { ...state, news6: action.payload }
        case NEWS12:
            return { ...state, news12: action.payload }
        default:
            return state
    }
}

export default newsReducer