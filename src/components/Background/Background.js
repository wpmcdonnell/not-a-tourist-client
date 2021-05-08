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
      textAlign: 'center'
    }
    return (
      <div style={backgroundStyle}>
        <h3>Welcome to Not a Tourist</h3>
        <h5>Sign in or Sign up to access message board</h5>
      </div>
    )
  }
}

export default Background
