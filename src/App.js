import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    title: "",
    movies: []
  }

  // Debounce / Throttling
  // Reponsive

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title && this.state.title.length > 2) {
      let response = await fetch(`https://www.omdbapi.com/?apikey=45af4549&page=1&s=${this.state.title}`)

      response = await response.json()

      let movies = response.Search || []

      movies = movies.slice(0, 5)

      this.setState({ movies })
    }
  }

  render() {
    const { title, movies } = this.state

    return (
      <div className="app">
        <div className="app-container">
          <input type="text" placeholder="Search movies..." className="search-bar" value={title} onChange={e => this.setState({ title: e.target.value })} />
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
