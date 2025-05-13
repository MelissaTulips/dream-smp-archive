import firebase from 'firebase-mock';

const mockauth = new firebase.auth.MockAuth();
const mockfirestore = new firebase.firestore.MockFirestore();

global.firebase = firebase;
global.mockauth = mockauth;
global.mockfirestore = mockfirestore;
