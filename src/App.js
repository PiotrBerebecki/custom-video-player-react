import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      
      <div className="player">
      
        <video className="player__video viewer" src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"></video>

        <div className="player__controls">
          <div className="progress">
           <div className="progress__filled"></div>
          </div>
          <button className="player__button toggle" title="Toggle Play">►</button>
          <input type="range" name="volume" className="player__slider" min="0" max="1" step="0.05" value="1"/>
          <input type="range" name="playbackRate" className="player__slider" min="0.5" max="2" step="0.1" value="1"/>
          <button data-skip="-10" className="player__button">« 10s</button>
          <button data-skip="25" className="player__button">25s »</button>
        </div>
        
      </div>
      
    );
  }
}

export default App;
