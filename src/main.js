const React = require('react');
const ReactDOM = require('react-dom');


/*
<App />
*/
const App = React.createClass({

  render : function() {
    return (
      <article className="app">
        <Header />
        <Profile />
        <Footer />
      </article>
    )
  }
});

/*
<Header />
*/

const Header = React.createClass({

  render : function() {
    return (
      <header>
        Header!
      </header>
    )
  }
});

/*
<Footer />
*/

const Footer = React.createClass({

  render : function() {
    return (
      <footer>
        Footer!
      </footer>
    )
  }
});



/*
<Section />
*/

const Section = React.createClass({

  render : function() {
    return (
      <section>
        Section
      </section>
    )
  }
});

/*
This component is meant to display a full user profile.
<Profile />
*/

const Profile = React.createClass({
  getDefaultProps() {
    return {
      name:   'Jane Jetson',
      title:  'The Coldest',
      url:    'http://jetsons.com',
      email:  'jane@jetsons.com',
      phone:  '(555) 555-1212',
    }
  },

  render : function() {
    const { name, title, url, email, phone } = this.props;

    const styles = {
        "profile": {
          "background": "transparent"
        },
        "name": {
          "": ""
        },
        "title": {
          "": ""
        },
        "website": {
          "display": "block"
        },
        "email": {
          "display": "block"
        },
        "phone": {
          "display": "block"
        },
      }

    return (
      <article className="profile" itemScope itemType="http://schema.org/Person" style={ styles.profile } >
        <h1 className="name" itemProp="name" style={ styles.name } >{ name }</h1>
        <h2 className="title" itemProp="jobTitle" style={ styles.title } >{ title}</h2>
        <a className="website" itemProp="url" href={ url } style={ styles.website } >{ url }</a>
        <a className="email" itemProp="email" href={ `mailto:${ email}` } style={ styles.email } >{ email }</a>
        <span className="phone" itemProp="telephone" style={ styles.phone } >{ phone }</span>
      </article>
    )
  }
});


ReactDOM.render(<App />, document.querySelector('#main'));
