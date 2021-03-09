import firebase from '../firebase';

export const signOut = () => {
	firebase.auth().signOut();
};

export const hh = 5;

