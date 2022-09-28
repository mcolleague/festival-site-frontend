import React, { useEffect } from 'react';
import Nav from '../components/Nav';

function Home(props) {
  const { setPage } = props;

  useEffect(() => setPage('Home'), []);

  return (
    <div className="InnerPage">
      <Nav usage='home' />
    </div>
  )
}

export default Home;
