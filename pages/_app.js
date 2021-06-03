import '../styles/globals.css'
import App from 'next/app';
import useAutenticacion from '../hooks/useAutenticacion';
import firebase, {FirebaseContext} from '../firebase';

function MyApp({ Component, pageProps }) {

  const usuario = useAutenticacion();

  return (
    <FirebaseContext.Provider
    value={{
      firebase,
      usuario
    }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
    
  )
}

export default MyApp
