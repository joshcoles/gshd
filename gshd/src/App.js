import React, { Component } from 'react';
import './styles/app.scss';
import { tsConstructorType } from '@babel/types';

class App extends Component {

  state = {
    articleLink: 'https://www.reddit.com/r/hockey/comments/3e518u/wayne_gretzkys_strange_eating_habits/'
  }

  render() {
    return (
      <div id="gshd" className="App">
        <header>
        <nav></nav>
          <h1>Gretzky-Style Hot Dog</h1>
          <span>An ode to Waynge Gretzky's strange eating habits.</span>
        </header>
        <section>
          <h2>What is this?</h2>
          <p>On June 15th, someone created <a href={this.state.articleLink}>this post</a> on the /r/hockey subreddit. That user has since deleted their account, but their story will live on forever.</p>
          <p></p>
        </section>
      </div>
    );
  }
}

export default App;
