import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import redditScreenshot from '../../images/assets/reddit-post.png';

class Home extends Component {

  state = {
    landingPage: {
      articleLink: 'https://www.reddit.com/r/hockey/comments/3e518u/wayne_gretzkys_strange_eating_habits/',
      gretzkyQuotes: {
        iPlayBest: "\"I play best on four hot dogs with mustard and onions.\"",
        secret: "\"People ask me what’s my secret on ice? Bad breath.\"",
        classic: "\"We have hot dogs in here? We're in a baseball stadium, I need a dog\" - Wayne Gretzky, 2017 Winter Classic",
        haveAnyMustard: "\"Do you have any mustard?\" - Wayne Gretzky, 2017 Winter Classic"
      }
    }
  }

  render() {
    
    return (
      <div className="home">
        <section className="hero">
          <div className="hero-body">
            <div className="container title-container">
              <h1 className="title">Gretzky-Style<br/>Hot Dog</h1>                
              <h2 className="subtitle">A celebration of Wayne Gretzky's strange eating habits.</h2>
            </div>
            <div className="container cta-container">
              <Link className="button button-dark-hollow">See GSHDs</Link>
              <Link className="button button-dark">Join the Community</Link>
            </div>
          </div>
        </section>
        <section className="section how-it-started">
          <h3 className="subtitle">How it started</h3>
          <div className="container">          
            <p>In or around 2015 a now-deleted reddit user made <a href={this.state.landingPage.articleLink}>this post</a>, highlighting Wayne Gretzky's strange eating habits.</p>

          </div>
          <div className="container image-container">
            <a target="_blank" href={this.state.landingPage.articleLink} rel="noopener noreferrer">
              <img alt="A screenshot of a reddit post about Wayne Gretzky's eating habits." src={redditScreenshot}/>
            </a>
            <span>The <a target="_blank" href={this.state.landingPage.articleLink} rel="noopener noreferrer">reddit post</a> that started it all.</span>
          </div>
          <div className="container">
            <p>Most notable of all was his fondness of hot dogs with—-and I cannot stress this enough--only mustard and onions on them.</p>
            <p>Shortly after, this site's creator created an <a href="https://instagram.com/gretzkystylehotdog/">instagram account</a> by the same name, which quickly gained a small following of GSHD fans. The rest is history.</p>
          </div>


          
        </section>
        <section className="section">
          <div className="container">
            <h2>What is this?</h2>
            <p>On June 15th, someone created <a href={this.state.landingPage.articleLink}>this post</a> on the /r/hockey subreddit. While that user has since deleted their account, but their story will live on forever.</p>
            <p>Shortly after, I created gretzkystylehotdog</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
           <span>{this.state.landingPage.gretzkyQuotes.secret}</span>
          </div>
        </section>
      </div>
    )
  }
}

export default Home;
