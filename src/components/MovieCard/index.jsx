import React from "react";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop/index";
import "./style.css";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRemoveButtonKeyDown = this.handleRemoveButtonKeyDown.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      const { open } = prevState;
      return { open: !open };
    });
  }

  handleKeyDown() {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  }

  handleRemoveButtonKeyDown(movieId) {
    const {
      methods: { handleDeleteMovie },
    } = this.props;
    return handleDeleteMovie(movieId);
  }

  render() {
    const { open } = this.state;
    const {
      styleType,
      movie: {
        movieId,
        imgUrl,
        imgTitle,
        title,
        description,
        likes,
        watched,
        released,
      },
      methods: { handleWatchedMovies, handleDeleteMovie },
    } = this.props;
    return (
      <div className="MovieCard">
        {open && <Backdrop onClick={this.handleClick} />}
        <div
          className={`${
            styleType === "style1" ? "card-header" : "card-header-style2"
          }`}
        >
          <img src={imgUrl} alt={imgTitle} role="presentation" />
          {styleType === "style2" && (
            <div className="card-footer-style2">
              <div className="title">
                <h2>{title}</h2>
              </div>
              <div className="card-menu">
                <i
                  className="fas fa-ellipsis-v"
                  onClick={this.handleClick}
                  role="button"
                  tabIndex={0}
                  aria-label="menu"
                  onKeyDown={this.handleKeyDown}
                />
                {open && (
                  <div className="card-menu_list">
                    <ul>
                      <li>
                        <i className="fas fa-edit" />
                      </li>
                      <li>
                        <button
                          className="check-button"
                          type="button"
                          onClick={() => {
                            return handleWatchedMovies(movieId);
                          }}
                        >
                          <i className="far fa-check-circle" />
                        </button>
                      </li>
                      <li>
                        <i
                          role="button"
                          aria-label="remove-movie"
                          tabIndex={0}
                          onKeyDown={() =>
                            this.handleRemoveButtonKeyDown(movieId)}
                          className="fas fa-trash"
                          onClick={() => handleDeleteMovie(movieId)}
                        />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {styleType === "style1" && (
          <div className="card-main-content">
            <div className="card-main-content__title">
              <h2>{title}</h2>
            </div>
            <div className="card-main-content__description">
              <p>{description}</p>
            </div>
          </div>
        )}
        {styleType === "style1" && (
          <div className="card-footer">
            <div className="card-footer__content">
              <i className="fas fa-star" />
              <p className="starts">{likes}</p>
            </div>
            <div className="card-footer__content">
              <i className="fas fa-eye" />
              <p className="starts">{watched}</p>
            </div>
            <div className="card-footer__content">
              <i className="fas fa-calendar-alt" />
              <p className="starts">{released}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MovieCard.propTypes = {
  styleType: PropTypes.string.isRequired,
  methods: PropTypes.shape({
    handleWatchedMovies: PropTypes.func.isRequired,
    handleDeleteMovie: PropTypes.func.isRequired,
  }).isRequired,
  movie: PropTypes.shape({
    movieId: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    imgTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    watched: PropTypes.bool.isRequired,
    released: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
