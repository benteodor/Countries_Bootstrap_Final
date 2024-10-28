// src/pages/Search.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountryDetails, clearSearchedCountry } from '../redux/searchCountrySlice';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [countryName, setCountryName] = useState('');
    const { searchedCountry, loading, error } = useSelector((state) => state.searchCountry);

    const handleSearch = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else if (countryName) {
                dispatch(clearSearchedCountry()); // Clear previous search result before searching
                dispatch(searchCountryDetails(countryName));
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Search Country Details with Weather</h2>

            <div className="form-group">
                <label htmlFor="countryInput">Enter Country Name</label>
                <input
                    type="text"
                    id="countryInput"
                    className="form-control"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                />
            </div>

            <button className="btn btn-primary mt-3" onClick={handleSearch} disabled={!countryName}>
                Search
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row mt-4">
                {searchedCountry && (
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <img src={searchedCountry.country.flags.png} className="card-img-top" alt={searchedCountry.country.name.common} />
                            <div className="card-body">
                                <h5 className="card-title text-center">{searchedCountry.country.name.common}</h5>
                                <p className="card-text"><strong>Capital:</strong> {searchedCountry.country.capital[0]}</p>
                                <p className="card-text"><strong>Region:</strong> {searchedCountry.country.region}</p>
                                <p className="card-text"><strong>Population:</strong> {searchedCountry.country.population.toLocaleString()}</p>
                                <p className="card-text"><strong>Weather:</strong> {searchedCountry.weather.current.condition.text}</p>
                                <p className="card-text"><strong>Temperature:</strong> {searchedCountry.weather.current.temp_c} &#8451;</p>
                                <p className="card-text"><strong>Wind:</strong> {searchedCountry.weather.current.wind_kph} kph, {searchedCountry.weather.current.wind_dir}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
