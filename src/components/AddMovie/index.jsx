import React, { Component, createRef } from 'react';
import debounce from '../../utils/debounce';
import MoviesList from '../MoviesList';
import './style.css';

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      movies: [],
      rating: '',
      description: '',
      showMovieList: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleChooseMovie = this.handleChooseMovie.bind(this);
    this.handleImageSrc = this.handleImageSrc.bind(this);
    this.debounceFunc = createRef();
  }

  componentDidMount() {
    this.debounceFunc.current = debounce(
      () => this.handleRequest(this.state.name),
      1000
    );
  }

  handleRequest(value) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=304ac5e762f0abd7fc2c27e96bd42840&language=en-US&query=${value}`
    )
      .then((res) => res.json())
      .then((movies) =>
        this.setState({ movies: movies.results, showMovieList: true })
      )
      .catch((err) => console.log(err));
  }

  handleSearch(event) {
    const {
      target: { value },
    } = event;
    this.setState({ name: value });
    this.debounceFunc.current(value);
  }

  handleDescription(event) {
    const {
      target: { value },
    } = event;
    this.setState({ description: value });
  }

  handleRating(event) {
    const {
      target: { value },
    } = event;
    this.setState({ rating: value });
  }

  handleImageSrc(event) {
    const {
      target: { value },
    } = event;
    this.setState({ url: value });
  }

  handleChooseMovie(movieId) {
    const { movies } = this.state;
    const {
      poster_path: url,
      popularity: rating,
      overview: description,
      original_title: name,
    } = movies.filter((movie) => movie.id === movieId)[0];
    this.setState({
      url,
      rating,
      description,
      name,
      showMovieList: false,
    });
  }

  render() {
    const {
      name,
      url,
      description,
      movies,
      rating,
      showMovieList,
    } = this.state;
    return (
      <div className="movie-form-container">
        <h2 className="add-movie-header">Add New Movie</h2>
        <form className="movie-form">
          <div className="add-movie-input-row">
            <label htmlFor="movie-title">Title</label>
            <input
              type="text"
              value={name}
              onChange={this.handleSearch}
              id="movie-title"
            />
          </div>
          <div className="add-movie-input-row">
            <label htmlFor="movie-description">Description</label>
            <textarea
              type="text"
              value={description}
              onChange={this.handleDescription}
              id="movie-description"
            />
          </div>
          <div className="add-movie-input-row">
            <label htmlFor="movie-img-poster">Poster Image</label>
            <input
              type="text"
              value={url === '' ? '' : `https://image.tmdb.org/t/p/w500/${url}`}
              onChange={this.handleImageSrc}
            />
          </div>
          <div className="add-movie-input-row">
            <label htmlFor="movie-rating">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={this.handleRating}
              id="movie-rating"
            />
          </div>
          <input className="submit-button" type="button" value="Submit" />
        </form>
        {showMovieList ? (
          <MoviesList
            movies={movies}
            handleChooseMovie={this.handleChooseMovie}
          />
        ) : null}
      </div>
    );
  }
}
