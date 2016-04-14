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
        <Section>
          <Profile />
        </Section>
        <Footer />
      </article>
    )
  }
});

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
        <a className="button">test</a>
        <button>test</button>
      </footer>
    )
  }
});

/*
<Section />
*/
const Section = React.createClass({

  render : function() {
    const { children } = this.props;

    return (
      <section>
        { children }
      </section>
    )
  }
});

/*
This component is meant to display a full user profile.
<Profile name="" title="" url="" email="" phone="" />
*/

const Profile = React.createClass({

    /* Set default props in case api fails */
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

    /* Stub styles for future use */
    const styles = {
        "profile": {
          "": ""
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
