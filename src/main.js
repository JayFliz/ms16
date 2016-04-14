const React = require('react');
const ReactDOM = require('react-dom');


/*
<App />
*/
const App = React.createClass({

  render : function() {
    return (
      <div className="app">
        <Header />
        <Atom />
        <Footer />
      </div>
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
<Atom />
*/

const Atom = React.createClass({

  render : function() {
    return (
      <p>Atom</p>
    )
  }
});

ReactDOM.render(<App />, document.querySelector('#main'));
