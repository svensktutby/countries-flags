import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectControls } from '../controls/controls-slice';
import { loadCountries, selectCountriesInfo, selectVisibleCountries } from './countries-slice';

export const useCountries = () => {
    const dispatch = useDispatch();
    const { search, region } = useSelector(selectControls);
    const countries = useSelector((state) => selectVisibleCountries(state, { search, region }));
    const { status, error, countriesQuantity } = useSelector(selectCountriesInfo);

    useEffect(() => {
        if (!countriesQuantity) dispatch(loadCountries());
    }, [countriesQuantity, dispatch]);

    return { countries, status, error };
};
