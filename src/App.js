import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // constructor() {
  //   super();
    
  // }
  
  render() {
    return (
      
      <div className="player">
      
        <video
          className="player__video viewer" 
          controls
          autoPlay
          src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
        />

        
      </div>
      
    );
  }
}

export default App;


