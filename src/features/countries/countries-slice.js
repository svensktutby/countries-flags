import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCountries = createAsyncThunk('@@countries/load-countries', async (_, { extra: { client, api } }) => {
    return client.get(api.ALL_COUNTRIES);
});

const initialState = {
    status: 'idle', // loading | received | rejected
    error: null,
    list: [],
};

const countriesSlice = createSlice({
    name: '@@countries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountries.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
            })
            .addCase(loadCountries.fulfilled, (state, action) => {
                state.status = 'received';
                state.list = action.payload.data;
            });
    },
});

export const countriesReducer = countriesSlice.reducer;

export const selectCountriesInfo = (state) => ({
    status: state.countries.status,
    error: state.countries.error,
    countriesQuantity: state.countries.list.length,
});

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, { search = '', region = '' }) =>
    state.countries.list.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) &&
            c.region.toLowerCase().includes(region.toLowerCase()),
    );
