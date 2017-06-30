import React, { Component } from 'react';
import './App.css';
import Pager from './components/Pager';

class App extends Component {
  displayCurrentPage = (currentPage) => {
    console.log(currentPage);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React & Jest Demo</h2>
        </div>
        <div>
          <Pager currentPage={2} totalPages={15} onPageChange={this.displayCurrentPage} />
        </div>
      </div>
    );
  }
}

export default App;
