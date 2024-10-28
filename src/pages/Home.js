// src/pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetails } from '../redux/countrySlice';

function Home() {
    const dispatch = useDispatch();
    const { countries, loading, error } = useSelector((state) => state.countries);

    useEffect(() => {
        const countryNames = [
            'Pakistan', 'India', 'China', 'Japan', 'France', 'Germany', 'Italy', 'Brazil', 'Australia', 'Canada',
            'Mexico', 'United States', 'Argentina', 'Russia', 'Spain', 'South Africa', 'Egypt', 'Nigeria', 'Indonesia', 'Thailand'
        ];
        countryNames.forEach((country) => dispatch(fetchCountryDetails(country)));
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Country Details with Weather</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {countries.map((data, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <img src={data.country.flags.png} className="card-img-top" alt={data.country.name.common} />
                            <div className="card-body">
                                <h5 className="card-title text-center">{data.country.name.common}</h5>
                                <p className="card-text"><strong>Capital:</strong> {data.country.capital[0]}</p>
                                <p className="card-text"><strong>Region:</strong> {data.country.region}</p>
                                <p className="card-text"><strong>Population:</strong> {data.country.population.toLocaleString()}</p>
                                <p className="card-text"><strong>Weather:</strong> {data.weather.current.condition.text}</p>
                                <p className="card-text"><strong>Temperature:</strong> {data.weather.current.temp_c} &#8451;</p>
                                <p className="card-text"><strong>Wind:</strong> {data.weather.current.wind_kph} kph, {data.weather.current.wind_dir}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
