import React, { Component } from 'react';
import { throttle } from 'lodash';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      movies: []
    }

    this.handleInput = this.handleInput.bind(this)

    // Throttling
    this.handleInputThrottled = throttle(this.handleInput, 100)
  }

  handleInput(e) {
    const title = e.target.value
    this.setState({ title })

    if (title.length > 2) {
      this.fetchData()
    }
  }

  async fetchData() {
    let response = await fetch(`https://www.omdbapi.com/?apikey=45af4549&page=1&s=${this.state.title}`)
    response = await response.json()

    let movies = response.Search || []
    movies = movies.slice(0, 5)

    this.setState({ movies })
  }

  render() {
    const { title, movies } = this.state

    return (
      <div className="app">
        <div className="app-container">
          <input type="text" placeholder="Search movies..." className="search-bar" value={title} onChange={this.handleInputThrottled} />
          <div>
            {movies.map(movie => {
              return <div key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <img src={movie.Poster} alt="movie" />
              </div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
