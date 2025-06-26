import { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/loader/Loader';
import Home from './pages/Home';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Home/>
        </>
      )}
    </>
  );
}

export default App;
