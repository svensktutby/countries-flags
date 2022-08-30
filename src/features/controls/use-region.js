import { useDispatch, useSelector } from 'react-redux';
import { selectRegion, setRegion } from './controls-slice';

export const useRegion = () => {
    const dispatch = useDispatch();
    const region = useSelector(selectRegion);

    const handleSelect = (option) => {
        dispatch(setRegion(option?.value || ''));
    };

    return { region, handleSelect };
};
