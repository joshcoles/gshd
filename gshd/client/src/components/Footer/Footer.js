import React, { Component } from 'react';
import './footer.scss';

class Footer extends Component {

  render() {
    return (
      <footer class="footer">
        <div class="content has-text-centered">
          <p><strong>Gretzky-Style Hot Dog</strong> by <a href="https://joshcoles.com">Josh Coles</a>.</p>
        </div>
      </footer>
    )
  }
} 

export default Footer;