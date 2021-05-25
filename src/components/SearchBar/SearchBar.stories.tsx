import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { storiesOf } from '@storybook/react';

const [showResults, setShowResults] = useState(false);

storiesOf('SearchBar', module)
  .add('Default', () => {
    return (
      <>
        <SearchBar
          id="searchbar-story-id"
          labelText="This is the label text"
          placeholderText="Type here, then click the button to see results"
          onSearch={() => {
            setShowResults(true);
            return {}
          }}
        />
        {showResults && (
          <p>
            You clicked search! Results will show up here!
          </p>
        )}
      </>
    )
  });