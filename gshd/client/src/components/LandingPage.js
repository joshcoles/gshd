import React, { Component } from 'react';

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

  render(props) {
    console.log(this.props);
    return (
      <div className="landing-page">
        <header>
          <nav></nav>
          <div className="hero-content">
            <h1>Gretzky-Style Hot Dog</h1>
            <span>An ode to Waynge Gretzky's strange eating habits.</span>
          </div> 
          <div className="hero-bg-gretzky"></div>
        </header>
        <section>
          <h2>A Man of Tradition and Great Taste</h2>
        </section>
        <section>
          <h2>What is this?</h2>
          <p>On June 15th, someone created <a href={this.state.landingPage.articleLink}>this post</a> on the /r/hockey subreddit. While that user has since deleted their account, but their story will live on forever.</p>
          <p>Shortly after, I created gretzkystylehotdog</p>
        </section>
        <section>
          <span>{this.state.landingPage.gretzkyQuotes.secret}</span>
        </section>
      </div>
    )
  }
}

export default LandingPage;
