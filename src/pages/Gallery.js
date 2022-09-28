import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import arrowRight from '../ArrowRight.svg';
import { iframeResize } from 'iframe-resizer';
import LoginForm from '../components/LoginForm';
import { wpSiteURL } from '../helpers/api';

function Gallery(props) {
  const { setPage, pageClasses, setPageClasses, isLoggedIn } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const originalPageClasses = pageClasses;

  const onIframeLoad = () => {
    // setTimeout($el.classList.remove('hidden'), 500);
    setTimeout(setIsLoaded(true), 500);
    iframeResize();
  }

  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to="/home"><span className="Arrow --left"><img src={arrowRight}/></span></Link>
    )
  }

  const onMessage = ({ data: { eventName }}) => {
    if (!eventName) return;
    let pageclassesToAdd = eventName === 'portfolio_open' ? ' --galleryOpen' : '';
    setPageClasses(originalPageClasses + pageclassesToAdd);
  }

  useEffect(() => {
    setPage('Gallery');
    window.addEventListener('message', onMessage);
  }, []);

  return (
  <>
    { isLoggedIn ? (
      <div className="InnerPage">
        <h1 className="InnerPage--title"><BackLink /> Gallery</h1>
        { !isLoaded && <div>Loading...</div> }
        <iframe 
          id="gallery" 
          className={!isLoaded ? 'hidden' : ''}
          src={`${wpSiteURL}/gallery?isIframe=true`} 
          onLoad={onIframeLoad}></iframe>            
      </div> 
    ) : (
      <LoginForm {...props} isRestrictedContent={true} />
    ) }    
  </>
  )
}

export default Gallery;