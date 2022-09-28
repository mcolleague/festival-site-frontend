import React, { useState, useEffect } from 'react';
import { Redirect, Switch, Link, NavLink, Route } from "react-router-dom";
import arrowRight from '../ArrowRight.svg';
import lineUp from '../Lineup.jpg';
import LoginForm from '../components/LoginForm';
import { artistURL } from '../helpers/api';

function Programme(props) {
  const { isLoggedIn, setPage } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const routeName = 'programme';
  const [artists, setArtists] = useState([]);

  const getArtists = async () => {
    const res = await fetch(artistURL);
    const json = await res.json();
    const data = json.sort((a,b) => (a.slug > b.slug) ? 1 : ((b.slug > a.slug) ? -1 : 0));
    setArtists(data);
    setIsLoaded(true);
  }

  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to='/home'><span className="Arrow --left"><img src={arrowRight}/></span></Link>
    )
  }

  const LineUp = () => {
    return (
      <div id="lineUp">
        <a href={lineUp} target="_blank"><img src={lineUp}/></a>
      </div>
    )
  }  

  const Artist = ({ isPage, id, slug, title, content, featured_image_src }) => {
    return isPage ? 
    <div className={`Artist --page id--${id}`}>
      <div className="Artist__img Image">
        <img src={ featured_image_src } alt={ title.rendered }/>      
      </div>
      <div className="Artist__description">
        <div className="Artist__name">
          <Link className="Link --hasArrow" to={`/${routeName}/artists`}><span className="Arrow --left --sm"><img src={arrowRight}/></span></Link>
          <h2 dangerouslySetInnerHTML={{__html: title.rendered}}></h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: content.rendered}}></div>
      </div>
    </div> :

    <div className="ArtistGrid__item">
      <NavLink className={`Artist --card id--${id}`} to={`/${routeName}/artists/${slug}`}>
        <div className="Artist__img Image">
          <img src={ featured_image_src } alt={ title.rendered }/>
          <div className="Artist__name" dangerouslySetInnerHTML={{__html: title.rendered}}></div>
        </div>
      </NavLink>
    </div>
  }

  const Artists = ({ match }) => {
    const artistSlug = match?.params?.artistSlug;
    const artist = artistSlug ? artists.find(({slug}) => slug == artistSlug) : null;

    return artist ? <Artist isPage={true} {...artist}/> :
      <div className="ArtistGrid">
        {artists.map(artist => <Artist key={artist.id} {...artist} />)}
      </div>
  }  

  useEffect(() => {
    if (!artists.length) getArtists();
    setPage('Programme');
  }, []);

  return (
    <>
    { isLoggedIn ? (
      <div className="InnerPage">
        <h1 className="InnerPage--title"><BackLink /> Programme</h1>
        { !isLoaded ? <div>Loading...</div> : <>

          <div className="Tabs">
            <div className="Tabs__toggles">
                <NavLink className="Tabs__toggle" to={`/${routeName}/line-up`}>Line-up</NavLink>
                <NavLink className="Tabs__toggle" to={`/${routeName}/artists`}>artists</NavLink>
            </div>
            <div className="Tabs__tabs">
              <Switch>
                <Route path={`/${routeName}/line-up`}><LineUp/></Route>
                <Route path={`/${routeName}/artists/:artistSlug/`} component={Artists}></Route>
                <Route path={`/${routeName}/artists`}><Artists {...props}/></Route>
                <Redirect to={`/${routeName}/line-up`} />
              </Switch>
            </div>
          </div>

        </> }      
      </div>
    ) : (
      <LoginForm {...props} isRestrictedContent={true} />
    ) }
    </>
  )
}

export default Programme;
