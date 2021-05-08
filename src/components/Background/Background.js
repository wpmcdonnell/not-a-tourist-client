import React, { Component } from 'react'
//  impoort out axios request to get all mocies
class Background extends Component {
  render () {
    // const backgroundImageUrl = <img src="nlbg.jpg" alt='Somewhere in Japan'>

    const backgroundStyle = {
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'url("nlbg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      // width: '100vw',
      color: 'White',
      textAlign: 'Center',
      textShadow: '-2px 0 black, 0 3px black, 1px 0 black, 0 -1px black'
    }

    // const textStyle = {
    //
    //
    // }
    return (
      <div style={backgroundStyle}>
        <div className='col-4 pt-4 ml-1 box'>
          <h2 className=''>Welcome to </h2>
          <h2 className='ml-5 pl-5'> Not a Tourist</h2>
          <h5 className='mt-5'>Sign in or Sign up</h5>
          <h5 className='ml-5 pb-4 pl-5'>to access message board</h5>
        </div>
      </div>
    )
  }
}

export default Background
