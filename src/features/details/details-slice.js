import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCountry = createAsyncThunk('@@details/load-country', (name, { extra: { client, api } }) => {
    return client.get(api.searchByCountry(name));
});

export const loadNeighbors = createAsyncThunk('@@details/load-neighbors', (codes, { extra: { client, api } }) => {
    return client.get(api.filterByCode(codes));
});

const initialState = {
    status: 'idle', // loading | received | rejected
    error: null,
    currentCountry: null,
    neighbors: [],
};

const detailsSlice = createSlice({
    name: '@@details',
    initialState,
    reducers: {
        clearDetails: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCountry.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountry.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
            })
            .addCase(loadCountry.fulfilled, (state, action) => {
                state.status = 'received';
                state.currentCountry = action.payload.data[0];
            })
            .addCase(loadNeighbors.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadNeighbors.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
            })
            .addCase(loadNeighbors.fulfilled, (state, action) => {
                state.status = 'received';
                state.neighbors = action.payload.data;
            });
    },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
