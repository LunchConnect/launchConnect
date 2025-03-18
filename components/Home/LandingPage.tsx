import React from 'react'
import Hero from './Hero'
import withHeaderAndFooter from '../../Hoc/withHeaderAndFooter'
import Hero_2 from './Hero_2';
import Hero_3 from './Hero_3';
import Hero_4 from './Hero_4';
import Hero_5 from './Hero_5';
import Hero_6 from './Hero_6';

const LandingPage:React.FC = () => {
  return (
    <>
      <div className='overflow-hidden'>
        <Hero />
        <Hero_2 />
        <Hero_3 />
        <Hero_4 />
        <Hero_5 />
        <Hero_6 />
      </div>
    </>
  );
}

export default withHeaderAndFooter(LandingPage)
