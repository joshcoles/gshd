import React, { Component } from 'react';
import Stars from './ui/Stars.js';

class LandingPage extends Component {

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
      <div className="landing-page">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Gretzky-Style Hot Dog</h1>

              <Stars rating={3} mutable={false} />
                
              <h2 className="subtitle">An ode to Wayne Gretzky's strange eating habits.</h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2>A Man of Tradition and Great Taste</h2>
            <p>Lulu lemon west coast best coast cambie west coast best coast translink lions heading up to whistler whitecaps false creek rain lulu lemon government heading up to whistler.</p>
            <p>West coast best coast vancouverites vancouverites mountains canucks vancouver skytrain heading up to whistler vancouver developers lulu lemon sedins stanley park arby's new brunch spot on main street government lions whitecaps heading up to whistler.</p>
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

export default LandingPage;
