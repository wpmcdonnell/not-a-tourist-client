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
      color: 'Black',
      textAlign: 'Center'
    }

    // const textStyle = {
    //
    //
    // }
    return (
      <div id="welcome-container" style={backgroundStyle} className="">
        <div id='welcome' className='box offset-md-1 col-md-3'>
          <h2 className='mt-2'>Welcome to </h2>
          <h2 className=''> Not a Tourist</h2>
          <h5 className=''>Sign in or Sign up</h5>
          <h5 className='mr-2 ml-2'>to access message board</h5>
        </div>
      </div>
    )
  }
}

export default Background
