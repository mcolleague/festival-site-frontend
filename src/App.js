import React, { useState, useEffect } from 'react';
import Scene from './r3f/Scene';
import { Canvas } from 'react-three-fiber';
import Router from './components/Router';
import './App.scss';
import { validateTokenURL } from './helpers/api';

function App() {
  const defaultPageClasses = 'Page';
  const [token, setToken] = useState(localStorage.getItem('hh_token'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMeta, setUserMeta] = useState({});
  const [info, setInfo] = useState('');
  const [page, setPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFlattened, setIsFlattened] = useState(true);
  const [pageClasses, setPageClasses] = useState('Page');

  const pageSetter = (pageName) => {
    const classesToAdd = [
      { modifier: '--wide', pages: ['Programme', 'Gallery'] }
    ].reduce((acc, {modifier, pages}) => (
      pages.includes(pageName) ? `${acc} ${modifier}` : acc
    ), defaultPageClasses)

    setPageClasses(classesToAdd);
    setPage(pageName);
  }

  const reset = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserMeta({});
    setIsLoading(false);
    localStorage.removeItem('hh_token');
  }

  const logIn = () => {
    setIsLoggedIn(true);
    localStorage.setItem('hh_token', token);
    setIsLoading(false);
  }

  const validateToken = () => {
    if (!token) {
      reset();
      return;
    }

    fetch(validateTokenURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
    }).then(response => { logIn()
    }).catch(error => { reset() })
  }

  useEffect(() => { validateToken() }, [token]);

  return (
    <div className={pageClasses} data-page={page} data-loading={isLoading}>
      { !isLoading && (
      <Router
        isLoggedIn={isLoggedIn}
        token={token}
        setToken={setToken}
        userMeta={userMeta}
        setUserMeta={setUserMeta}
        info={info}
        setInfo={setInfo}
        page={page}
        setPage={pageSetter}
        isFlattened={isFlattened}
        setIsFlattened={setIsFlattened}
        pageClasses={pageClasses}
        setPageClasses={setPageClasses}/>
      )}
      <div className="Page--bg">
        <Canvas>
          <Scene
          page={page}
          isFlattened={isFlattened}
          setIsFlattened={setIsFlattened}
          isLoggedIn={ isLoggedIn }/>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
