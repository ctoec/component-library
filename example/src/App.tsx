import React from 'react';
import { Button, Checkbox, FileInput } from '@ctoec/component-library';
import '@ctoec/component-library/dist/assets/styles/index.scss'
import 'uswds/dist/js/uswds';

function App() {
  return (
    <div className="App">
      <header className="App-header">
				<h1>CT OEC Example</h1>
      </header>
			<main>
				<Button text="Enter" />
				<Checkbox id="test" text="One" onChange={() => {}} />
				<FileInput id="file" label="Upload file" onChange={() => {}} />
			</main>
    </div>
  );
}

export default App;
