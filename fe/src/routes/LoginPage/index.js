import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { HeaderText, FooterText } from 'utils/config';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = Boolean(window.__login__);
  }
  render() {
    return (
      <div>
        <Header login={this.login} title={HeaderText} />
        <Footer fixed={true} title={FooterText} />
      </div>
    );
  }
}

export default LoginPage;
