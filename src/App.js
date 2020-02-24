import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    title: "",
    movies: []
  }

  render() {
    const { title, movies } = this.state

    return (
      <div className="app">
        <div className="app-container">
          <input type="text" placeholder="Search movies..." className="search-bar" value={title} onChange={e => this.setState({ title: e.target.value })} />
          <div>
            {movies.map(movie => movie)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
