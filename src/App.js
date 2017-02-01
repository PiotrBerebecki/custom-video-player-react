import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.togglePlay = this.togglePlay.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleRangeUpdate = this.handleRangeUpdate.bind(this);
    this.scrub = this.scrub.bind(this);
    this.state = {
      video: null,
      progress: '0%',
      playbackRate: 1,
      volume: 1,
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
      progress: `${percent}%`
    });
  }
  
  handleRangeUpdate(e) {
    console.log('range update');
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // Todo: Check how to update state with Immutable JS
    // instead of using refs
    this.refs.video[name] = value;
  }
  
  scrub(e) {
    const scrubTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * this.state.video.duration;
    // Todo: Check how to update state with Immutable JS
    // instead of using refs
    this.refs.video.currentTime = scrubTime;
  }
  
  render() {
    const { video, progress, playbackRate, volume } = this.state;
    
    return (
      
      <div className="player">
      
        <video
          className="player__video viewer"
          ref="video"
          // autoPlay
          src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
          onClick={this.togglePlay}
        />
        
        <div className="player__controls">

          <div 
            className="progress"
            onClick={this.scrub}
          >
           <div
             className="progress__filled"
             style={{'flexBasis': progress}}
           ></div>
          </div>
          
          <button 
            className="player__button toggle" 
            title="Toggle Play"
            onClick={this.togglePlay}>
            { video && video.paused ? '►' : '❚ ❚' }
          </button>
          
          <input 
            type="range" 
            name="volume" 
            className="player__slider" 
            min="0" max="1" step="0.05" value={volume}
            onChange={this.handleRangeUpdate}
          />
          <input 
            type="range" 
            name="playbackRate" 
            className="player__slider" 
            min="0.5" max="2" step="0.1" value={playbackRate}
            onChange={this.handleRangeUpdate}
          />
          
          <button 
            data-skip="-10" 
            className="player__button"
          >« 10s
          </button>
          
          <button 
            data-skip="25" 
            className="player__button"
          >25s »
          </button>
          
        </div>

        
      </div>
      
    );
  }
}

export default App;


