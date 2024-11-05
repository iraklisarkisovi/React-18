import logo from './logo.svg';
import './App.css';
import { Suspense, lazy } from 'react';

const HeavyFetching = lazy(() => import('./Components/HeavyFetching'))

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <HeavyFetching />
      </Suspense>
    </>
  );
}

export default App;
