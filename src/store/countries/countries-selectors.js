export const selectCountriesInfo = (state) => ({
    status: state.countries.status,
    error: state.countries.error,
    countriesQuantity: state.countries.list.length,
});

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, { search = '', region = '' }) =>
    state.countries.list.filter(
        (c) => c.name.toLowerCase().includes(search.toLowerCase()) && c.region.toLowerCase() === region.toLowerCase(),
    );
