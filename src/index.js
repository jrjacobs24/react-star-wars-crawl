import React, { Component } from "react";
import ReactDOM from "react-dom";
import { TimelineLite, Power2 } from "gsap";
import Logo from "./Logo.js";
import VolumeOn from "./VolumeOn";
import VolumeOff from "./VolumeOff";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.intro = React.createRef();
    this.logo = React.createRef();
    this.content = React.createRef();
    this.audio = React.createRef();

    this.state = {
      muted: true
    };
  }

  componentDidMount() {
    const numStars = 300;
    const root = document.getElementById("root");
    for (let i = 0; i < numStars; i++) {
      let star = document.createElement("div");
      star.className = "star";
      var xy = this.getRandomPosition();
      star.style.top = xy[0] + "px";
      star.style.left = xy[1] + "px";
      root.appendChild(star);
    }

    const tl = new TimelineLite();
    tl.to(this.intro.current, 4.5, { opacity: 1, delay: 1 })
      .to(this.intro.current, 1.5, {
        opacity: 0,
        onComplete: () => {
          this.audio.current.play();
        }
      })
      .set(this.logo.current, { opacity: 1, scale: 2.75, delay: 0.5 })
      .to(this.logo.current, 8, { scale: 0.05, ease: Power2.easeOut })
      .to(this.logo.current, 1.5, { opacity: 0 }, "-=1.5")
      .to(this.content.current, 200, { top: "-170%" });
  }

  getRandomPosition() {
    const y = window.innerWidth;
    const x = window.innerHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
  }

  onVolumeClick = () => {
    if (this.state.muted) {
      this.audio.current.muted = false;
    } else {
      this.audio.current.muted = true;
    }

    this.setState({ muted: !this.state.muted });
  };

  render() {
    return (
      <div className="container">
        <section className="intro" ref={this.intro}>
          <p>
            A long time ago, in a galaxy far, <br /> far away....
          </p>
        </section>
        <section className="logo" ref={this.logo}>
          <Logo />
        </section>
        <section className="crawl">
          <div className="content" ref={this.content}>
            <h1 className="title">Episode IV</h1>
            <h2 className="subtitle">A NEW HOPE</h2>
            <p>
              It is a period of civil war. Rebel spaceships, striking from a
              hidden base, have won their first victory against the evil
              Galactic Empire.
            </p>
            <p>
              During the battle, Rebel spies managed to steal secret plans to
              the Empire's ultimate weapon, the DEATH STAR, an armored space
              station with enough power to destroy an entire planet.
            </p>
            <p>
              Pursued by the Empire's sinister agents, Princess Leia races home
              aboard her starship, custodian of the stolen plans that can save
              her people and restore freedom to the galaxy....
            </p>
          </div>
        </section>
        <audio ref={this.audio}>
          <source
            type="audio/mpeg"
            src="https://archive.org/download/StarWarsThemeSongByJohnWilliams/Star Wars Theme Song By John Williams.mp3"
          />
        </audio>
        <button className="volume" type="button" onClick={this.onVolumeClick}>
          {this.state.muted ? <VolumeOff /> : <VolumeOn />}
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
