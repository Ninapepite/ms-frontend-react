import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

function CityInput({ value, onChange }) {
    return (
        <PlacesAutocomplete value={value} onChange={onChange}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input {...getInputProps({ className: 'form-control' })} />
                    <div>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => (
                            <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
                                {suggestion.description}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}

export default CityInput;
