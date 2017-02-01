import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.togglePlay = this.togglePlay.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.state = {
      video: null,
      progress: '0%'
    };
  }
  
  componentDidMount() {
    this.setState({
      video: this.refs.video
    }, () => {
      ['pause', 'play'].forEach(event => {
        this.state.video.addEventListener(event, () => {
          this.forceUpdate();
        });
      });
      
      this.state.video.addEventListener('timeupdate', this.handleProgress);
    });
  }
  
  togglePlay() {
    const { video } = this.state;
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }
  
  handleProgress() {
    const { video } = this.state;
    const percent = (video.currentTime / video.duration) * 100;
    this.setState({
      progress: percent
    });
  }
  
  render() {
    const { video } = this.state;
    // console.dir(this.state.video);
    
    return (
      
      <div className="player">
      
        <video
          className="player__video viewer"
          ref="video"
          autoPlay
          src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
          onClick={this.togglePlay}
        />
        
        <div className="player__controls">

          <div className="progress">
           <div
             className="progress__filled"
             style={{'flexBasis': this.state.progress}}
           ></div>
          </div>
          
          <button 
            className="player__button toggle" 
            title="Toggle Play"
            onClick={this.togglePlay}>
            { this.state.video && this.state.video.paused ? '►' : '❚ ❚' }
          </button>
          
          <input type="range" name="volume" className="player__slider" min="0" max="1" step="0.05"/>
          <input type="range" name="playbackRate" className="player__slider" min="0.5" max="2" step="0.1"/>
          
          <button data-skip="-10" className="player__button">« 10s</button>
          <button data-skip="25" className="player__button">25s »</button>
          
        </div>

        
      </div>
      
    );
  }
}

export default App;


