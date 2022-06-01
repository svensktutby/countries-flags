import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { selectAllCountries, selectCountriesInfo } from '../store/countries/countries-selectors';
import { loadCountries } from '../store/countries/countries-action';

export const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allCountries = useSelector(selectAllCountries);
    const { status, error, countriesQuantity } = useSelector(selectCountriesInfo);

    useEffect(() => {
        !countriesQuantity && dispatch(loadCountries());
    }, [countriesQuantity, dispatch]);

    return (
        <>
            <Controls />

            {error && <h2>{error}</h2>}
            {status === 'loading' && <h2>Loading...</h2>}

            {status === 'received' && (
                <List>
                    {allCountries.map((c) => {
                        const countryInfo = {
                            img: c.flags.png,
                            name: c.name,
                            info: [
                                {
                                    title: 'Population',
                                    description: c.population.toLocaleString(),
                                },
                                {
                                    title: 'Region',
                                    description: c.region,
                                },
                                {
                                    title: 'Capital',
                                    description: c.capital,
                                },
                            ],
                        };

                        return <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo} />;
                    })}
                </List>
            )}
        </>
    );
};
