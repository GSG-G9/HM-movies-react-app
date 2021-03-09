import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
	getMovies,
	removeMovie,
	saveMovies,
	watchedMovies,
} from '../../utils/firebaseStore';
import Header from "../Headers";
import About from "../About";
import Contact from "../Contact";
import MovieContainer from "../MovieContainer";
import SideNav from "../SideNav";

import firebase from "../../firebase"

import Home from '../Home'
import Login from "../Login";
import SignUp from "../Signup";
import Logout from '../Logout';
import Loading from '../Loading'

import "./style.css";

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			movies: getMovies(),
			isAuthenticated: false,
			loading:true,
		};
		this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
		this.handleWatchedMovies = this.handleWatchedMovies.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addSortCase = this.addSortCase.bind(this);
		this.addFilterCase = this.addFilterCase.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
    this.addSearchText = this.addSearchText.bind(this);
	}



	async componentDidMount() {
    const movies = await getMovies()
			firebase.auth().onAuthStateChanged((user) =>
				user
					? this.setState({
							movies,
							isAuthenticated: true,
							loading: false,
					  })
					: this.setState({
							movies,
							isAuthenticated: false,
							loading: false,
					  })
			);
	}

	handleAuthentication(value) {
		this.setState({ isAuthenticated: value });
	}

  async handleDeleteMovie(movieId) {
    const movies = await removeMovie(movieId);
    this.setState({ movies });
  }

  async handleWatchedMovies(movieId) {
    const movies = await watchedMovies(movieId);
    this.setState({ movies });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      target: [
        { value: title },
        { value: description },
        { value: imgUrl },
        { values: likes },
      ],
    } = event;
    const movies = await saveMovies({ title, description, imgUrl, likes });
    this.setState({ movies });
  }

  addSortCase(sortBy) {
    const { movies } = this.state;
    switch (sortBy) {
      case "alphabetical-ascending":
        this.setState({
          movies: movies.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          }),
        });
        break;
      case "alphabetical-dscending":
        this.setState({
          movies: movies.sort((a, b) => {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          }),
        });
        break;
      default:
        this.setState({ movies });
        break;
    }
  }

  addFilterCase() {
    this.setState({ movies: [] });
  }

  addSearchText(searchText) {
    const moviesArr = getMovies();
    const moviesSearched = moviesArr.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ movies: moviesSearched });
  }

	render() {
		const { show, movies, isAuthenticated,loading } = this.state;
		return loading ? (
  <Loading />
		) : (
  <div className='Layout'>
    <Header />
    <div className='main-content'>
      <SideNav />
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route
          exact
          path='/logout'
          render={(props) => <Logout {...props} />}
        />
        <Route
          exact
          path='/login'
          render={(props) => (
            <Login
              handleAuthentication={this.handleAuthentication}
              {...props}
            />
							)}
        />
        <Route
          exact
          path='/signup'
          render={(props) => (
            <SignUp
              handleAuthentication={this.handleAuthentication}
              {...props}
            />
							)}
        />
        {isAuthenticated &&
							[
								{
									route: '/movies',
									showWatchedMovies: false,
									styleType: 'style2',
									id: 1,
								},
								{
									route: '/watched',
									showWatchedMovies: true,
									styleType: 'style1',
									id: 2,
								},
							].map((el) => (
  <Route
    key={el.id}
    exact
    path={el.route}
    render={(props) => {
										return (
  <MovieContainer
    styleType={el.styleType}
    showWatchedMovies={el.showWatchedMovies}
    movies={movies}
    methods={{
													handleWatchedMovies: this.handleWatchedMovies,
													handleSubmit: this.handleSubmit,
													handleDeleteMovie: this.handleDeleteMovie,
													addSortCase: this.addSortCase,
													addFilterCase: this.addFilterCase,
													addSearchText: this.addSearchText,
												}}
    {...props}
  />
										);
									}}
  />
							))}

        {isAuthenticated ? (
          <Redirect to='/movies' />
						) : (
  <Route exact path='/' component={Home} />
						)}
        <Redirect to='/' />
      </Switch>
    </div>
    <div>{show}</div>
  </div>
		);}
}

Layout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(Layout);
