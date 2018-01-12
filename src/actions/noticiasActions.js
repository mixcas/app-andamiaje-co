import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'NOTICIAS_ERROR',
    data: message,
  })));
}

/**
 * Get Noticias
 */
export function getNoticias() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  console.log('getNoticias is running');
  return dispatch => new Promise(resolve => FirebaseRef.child('noticias')
    .on('value', (snapshot) => {
      console.log('snapshot', snapshot);

      const noticias = snapshot.val() || {};

      return resolve(dispatch({
        type: 'NOTICIAS_REPLACE',
        data: noticias,
      }));
    })).catch(e => console.log(e));
}
