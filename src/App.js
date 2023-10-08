import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, useLazyQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
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

  return (
    <div className="App">
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
        placeholder="Personality"
      />
      <button onClick={executeQuery}>
        Show Result
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>{data.getRequestResponse}</p>}
    </div>
  );
}

export default App;
