import PropTypes from "prop-types";

function MoviesList(props) {
  const { movies, handleChooseMovie } = props;
  const handleChooseMovieByKey = (id, e) => {
    return handleChooseMovie(id, e);
  };

  return (
    <>
      <ul>
        {movies
          ? movies.map((movie) => (
            <li
              tabIndex="0"
              role="button"
              aria-label="select-movie"
              key={movie.id}
              className="AddMovie-movie-item"
              onClick={(e) => handleChooseMovie(movie.id, e)}
              onKeyDown={(e) => handleChooseMovieByKey(movie.id, e)}
            >
              <div className="movie-original-title-container">
                <p className="movie-original-title">{movie.original_title}</p>
                <span className="movie-release-year">
                  Release on
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
              <img
                className="movie-thumbnail"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movie poster"
              />
            </li>
            ))
          : null}
      </ul>
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChooseMovie: PropTypes.func.isRequired,
};

export default MoviesList;
