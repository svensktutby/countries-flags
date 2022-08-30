import { useNavigate } from 'react-router-dom';

import { List } from './List';
import { Card } from './Card';
import { useCountries } from './useCountries';

export const CountryList = () => {
    const navigate = useNavigate();
    const { countries, status, error } = useCountries();

    return (
        <>
            {error && <h2>{error}</h2>}
            {status === 'loading' && <h2>Loading...</h2>}

            {status === 'received' && (
                <List>
                    {countries.map((c) => {
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
