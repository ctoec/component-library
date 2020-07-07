import React from 'react';
import { Button, Checkbox } from '@ctoec/component-library';
import '@ctoec/component-library/dist/assets/styles/index.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
				<h1>CT OEC Example</h1>
      </header>
			<main>
				<Button text="Enter" />
				<Checkbox id="test" text="One" onChange={() => {}} />
			</main>
    </div>
  );
}

export default App;
