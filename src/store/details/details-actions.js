export const SET_COUNTRY = '@@details/SET_COUNTRY';
export const SET_LOADING = '@@details/SET_LOADING';
export const SET_ERROR = '@@details/SET_ERROR';
export const CLEAR_DETAILS = '@@details/CLEAR_DETAILS';
export const SET_NEIGHBORS = '@@details/SET_NEIGHBORS';

export const setCountry = (country) => ({
    type: SET_COUNTRY,
    payload: country,
});

export const setLoading = () => ({
    type: SET_LOADING,
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const clearDetails = () => ({
    type: CLEAR_DETAILS,
});

const setNeighbors = (countries) => ({
    type: SET_NEIGHBORS,
    payload: countries,
});

export const loadCountry =
    (name) =>
    (dispatch, _, { client, api }) => {
        dispatch(setLoading());
        client
            .get(api.searchByCountry(name))
            .then(({ data }) => {
                dispatch(setCountry(data[0]));
            })
            .catch(({ message }) => {
                dispatch(setError(message));
            });
    };

export const loadNeighbors =
    (borders) =>
    (dispatch, _, { client, api }) => {
        client
            .get(api.filterByCode(borders))
            .then(({ data }) => {
                dispatch(setNeighbors(data.map((c) => c.name)));
            })
            .catch(console.error);
    };
