import { SET_SEARCH } from './controls-actions';

const initialState = {
    search: '',
};

export const controlsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_SEARCH:
            return { ...state, search: payload };
        default:
            return state;
    }
};
