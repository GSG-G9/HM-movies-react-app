import { v4 as movieId } from "uuid";




export const getMovies = () => {
  const savedUsers = JSON.parse(localStorage.getItem("movies")) || [
    {
      movieId: movieId(),
      imgUrl: "https://image.tmdb.org/t/p/w500//Nqatj16QV8j2kglLUrDUX9r5GL.jpg",
      imgTitle: "Troy Movie",
      title: "Troy",
      description:
        "In this re-telling of Iliad, set in 1174 B.C. after ten years of fighting in the Trojan War, the Greek warrior Odysseus decides to travel for home, but instead finds a string of mis-adventures over the sea and land as he, along with a captive Trojan warrior named Circe as well as a group of loyal Greek soldiers, venture on the sea and land to get home to the island kingdom of Icarus and fighting sea sirens, and other mystical creatures to get home to his wife Penelope who is being hounded by a group of suitors hoping she will chose to make one of them their bride.",
      likes: 1000,
      watched: false,
      released: 2017,
    },
  ];
  localStorage.setItem('movies', JSON.stringify(savedUsers));
  return savedUsers;
};

export const removeMovie = (id) => {
  const movies = getMovies();
  const remainingMovies = movies.filter((movie) => movie.movieId !== id);
  localStorage.setItem("movies", JSON.stringify(remainingMovies));
  return remainingMovies;
};

export const watchedMovies = (id) => {
  const movies = getMovies();
  const currentMovie = movies.filter((movie) => movie.movieId === id)[0];
  const remainingMovies = movies.filter((movie) => movie.movieId !== id);
  currentMovie.watched = true;
  localStorage.setItem(
    "movies",
    JSON.stringify([currentMovie, ...remainingMovies])
  );
  return [currentMovie, ...remainingMovies];
};

export const saveMovies = ({
  imgUrl,
  imgTitle = null,
  title,
  description,
  likes,
  watched = false,
  released = null,
}) => {
  const movie = {
    movieId: movieId(),
    imgUrl,
    imgTitle,
    title,
    description,
    likes,
    watched,
    released,
  };
  const movies = [movie, ...getMovies()];
  localStorage.setItem("movies", JSON.stringify(movies));
  return movies;
};

export const registerUser = (usernanme) => {
	localStorage.setItem('usernanme', usernanme);
	return localStorage.setItem('isAuth', true);
};
export const unRegisterUser = ()=>{
  return localStorage.setItem('isAuth',false)
}

export const isAuthUser = () => {
	return JSON.parse(localStorage.getItem('isAuth')) || false;
};

export const getUserName = ()=>{
  return localStorage.getItem('usernanme');
}