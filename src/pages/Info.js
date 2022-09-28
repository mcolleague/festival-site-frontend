import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { postURL } from '../helpers/api';
import { globals } from '../helpers/globals';
import axios from 'axios';
import arrowRight from '../ArrowRight.svg';

function Info(props) {
  const { info, setInfo, setPage } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const errorMsg = "Sorry, this content could not be displayed. Please refresh the page.";
  const getInfo = () => {
    setIsLoading(true);

    axios.get(postURL, {})
    .then(response => {
      for (var post of response.data) {
        if (post.id === globals.infoPostId) {
          setInfo(post.content.rendered);
          break;
        }
      }
      setError("");
      setIsLoading(false);
    })
    .catch(error => {
      setError(errorMsg);
      setIsLoading(false);
    });
  }

  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to="/home"><span className="Arrow --left"><img alt="" src={arrowRight}/></span></Link>
    )
  }

  useEffect(() => setPage('Info'), []);
  useEffect(() => { if (!info) getInfo() }, []);

  return (
    <div className="InnerPage">
      <h1 className="InnerPage--title"><BackLink /> Info</h1>
      { isLoading ? (
        <p>Loading...</p>
      ) : (
      <article className="Article">
        <div dangerouslySetInnerHTML={{ __html: info }}></div>
        <p>{ error }</p>
      </article>
      )}
    </div>
  )
}

export default Info;
