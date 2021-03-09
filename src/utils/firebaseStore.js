import firebase,{fireStore} from '../firebase';

export const signOut = () => {
	firebase.auth().signOut();
};


export const getMovies = async () => {
	const documents = await fireStore.collection('movies').get();
	return documents.docs.map((movie) => ({
		...movie.data(),
		movieId: movie.id,
	}));
};


export const saveMovies = async ({
  imgUrl,
  imgTitle = '',
  title,
  description,
  likes=0,
  watched = false,
  released = 0,
}) => {
  const movie = {
    imgUrl,
    imgTitle,
    title,
    description,
    likes,
    watched,
    released,
	};
	await fireStore.collection('movies').add(movie)
	const movies = await getMovies()
	return movies
};


export const removeMovie = async (id) => {
	await fireStore.collection('movies').doc(id).delete()
	const movies = await getMovies()
	return movies
};

export const watchedMovies = async (id) => {
  await fireStore.collection('movies').doc(id).update({watched:true})
	const movies = await getMovies();
	return movies;

};
