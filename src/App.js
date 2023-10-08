import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, useLazyQuery } from '@apollo/client';
import PlacesAutocomplete from 'react-places-autocomplete';
import Header from './components/Header';
import PersonalitySelect from './components/PersonalitySelect';
import ResultCard from './components/ResultCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/',
  cache: new InMemoryCache()
});

function App() {
  const [location, setLocation] = useState('');
  const [personality, setPersonality] = useState('');

  const QUERY = gql`
    query GetResponse($location: String!, $personality: String!) {
      getRequestResponse(location: $location, personality: $personality)
    }
  `;

  const [executeQuery, { loading, error, data }] = useLazyQuery(QUERY, {
    client,
    variables: { location, personality }
  });

  const handleSelectLocation = (address) => {
    setLocation(address);
  };

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <div className="input-row row mb-3">
          <div className="col-6">
            <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelectLocation}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading: placesLoading }) => (
                <div className="place-search">
                  <input {...getInputProps({ className: 'form-control', placeholder: 'Location' })} />
                  {placesLoading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.placeId} className="suggestion-item" {...getSuggestionItemProps(suggestion)}>
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div className="col-4">
            <PersonalitySelect onChange={(e) => setPersonality(e.target.value)} />
          </div>
          <div className="col-2">
            <button className="btn btn-primary w-100" onClick={executeQuery} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Show Result'}
            </button>
          </div>
        </div>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
      <div>
        <div>
          {data && data.getRequestResponse.split('\n\n').map((item, index) => (
            <ResultCard key={index} result={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
