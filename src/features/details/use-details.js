import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearDetails, loadCountry, selectDetails } from './details-slice';

export const useDetails = (name) => {
    const dispatch = useDispatch();
    const details = useSelector(selectDetails);

    useEffect(() => {
        dispatch(loadCountry(name));

        return () => {
            dispatch(clearDetails());
        };
    }, [name, dispatch]);

    return details;
};
