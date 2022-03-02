import { CRYPTOS10, CRYPTOS100 } from "../constants";

const coinsReducer = (state={ stats: null, cryptos10: [], cryptos100: [] }, action) => {
    switch(action.type) {
        case CRYPTOS10:
            return { ...state, cryptos10: action.payload.coins,  stats: action.payload.stats }
        case CRYPTOS100:
            return { ...state, cryptos100: action.payload.coins }
        default:
            return state
    }
}

export default coinsReducer