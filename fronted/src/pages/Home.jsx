import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import Newsletter from '../components/Newsletter'



function home() {
  return (
    <div>
     <Hero></Hero>
     <LatestCollection></LatestCollection>
     <BestSeller></BestSeller>
     <Policy></Policy>
     <Newsletter></Newsletter>
    </div>
  )
}

export default home
