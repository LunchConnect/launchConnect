import React from 'react'

import withHeaderAndFooter from '@/Hoc/withHeaderAndFooter'

import Hero from './Hero'
import Hero2 from './Hero_2';
import Hero3 from './Hero_3';
import Hero4 from './Hero_4';
import Hero5 from './Hero_5';


const LandingPage:React.FC = () => {
  return (
    <>
      <div className='overflow-hidden'>
        <Hero />
        <Hero2 />
        <Hero3 />
        <Hero4 />
        <Hero5 />
      </div>
    </>
  );
}

export default withHeaderAndFooter(LandingPage)
