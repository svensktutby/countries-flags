import { useDispatch, useSelector } from 'react-redux';
import throttle from 'lodash.throttle';
import { selectSearch, setSearch } from './controls-slice';

export const useSearch = () => {
    const dispatch = useDispatch();
    const search = useSelector(selectSearch);

    const handleSearch = throttle((e) => {
        dispatch(setSearch(e.target.value));
    }, 1000);

    return { search, handleSearch };
};
