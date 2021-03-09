import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import debounce from "../../utils/debounce";
import MoviesList from "../MoviesList";
import Loading from '../Loading'

import "./style.css";

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
      movies: [],
      rating: "",
      description: "",
      showMovieList: false,
      loading:true,
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
    this.debounceFunc.current = debounce(() => {
      const { name } = this.state;
      return this.handleRequest(name);
    }, 1000);
  }

  handleRequest(value) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=304ac5e762f0abd7fc2c27e96bd42840&language=en-US&query=${value}`
    )
      .then((res) => res.json())
      .then((movies) =>
        this.setState({ movies: movies.results, showMovieList: !!movies.results,loading:false })
      )
      .catch(() => this.setState({ movies: [] }));
  }

  handleSearch(event) {
    const {
      target: { value },
    } = event;
    this.setState({ name: value,showMovieList:true });
    this.debounceFunc.current();
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
    const { handleSubmit, handleHideAddMovie } = this.props;

    const {
      name,
      url,
      description,
      movies,
      rating,
      showMovieList,
      loading,
    } = this.state;
    return (
      <div className="movie-form-container showContainer">
        <h2 className="add-movie-header">Add New Movie</h2>
        <form
          className="movie-form"
          onSubmit={(e) => {
           handleHideAddMovie();
           return handleSubmit(e);
          }}
        >
          <div className="add-movie-input-row movie-list-container">
            <label htmlFor="movie-title">Title</label>
            <input
              type="text"
              value={name}
              onChange={this.handleSearch}
              id="movie-title"
            />
            {showMovieList ? (
              <div className="add-movie-movies-list">
                {loading ? 
                  <Loading />
                : (
                  <MoviesList
                    movies={movies}
                    handleChooseMovie={this.handleChooseMovie}
                  />
                
                )}
              </div>
            ) : null}
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
              value={url === "" ? "" : `https://image.tmdb.org/t/p/w500/${url}`}
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
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

AddMovie.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleHideAddMovie: PropTypes.func.isRequired,
};

export default withRouter(AddMovie);
