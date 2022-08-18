import React from 'react';
import './App.css';
import MoonGame from './pages/MoonGame';

// import Swal from 'sweetalert2'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <div>
        <MoonGame />
        {/* <ReactCursorPosition>
          <PositionTracker
            submit={this.onSubmitTracking}
            src={moon}
            disable={this.state.isFetching}
            setAngstrom={this.setAngstrom}
          />
        </ReactCursorPosition> */}
      </div>
    </div>
  );
}

export default App;
