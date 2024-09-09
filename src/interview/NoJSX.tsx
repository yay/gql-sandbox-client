import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';

// for ESLint use only
CustomComponent.propTypes = {
  text: PropTypes.string, // types are provided by Facebook for runtime type checking
};

function CustomComponent(props: { text?: string }) {
  return <div>{props?.text ?? 'Custom Component'}</div>;
}

export default function NoJSX() {
  return (
    <>
      <Header />
      <NoJsxHeader />
    </>
  );
}

export function Header() {
  return (
    <header className="App-header">
      <img alt="logo" className="App-logo" src={logo} />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" rel="noopener noreferrer" target="_blank">
        Learn React
      </a>
      <CustomComponent text="Or Don't" />
    </header>
  );
}

export function NoJsxHeader() {
  return React.createElement(
    'header',
    { className: 'App-header' },
    React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo' }),
    React.createElement('p', null, 'Edit ', React.createElement('code', null, 'src/App.js'), ' and save to reload.'),
    React.createElement(
      'a',
      { className: 'App-link', href: 'https://reactjs.org', target: '_blank', rel: 'noopener noreferrer' },
      'Learn React'
    ),
    React.createElement(CustomComponent, { text: "Or Don't" })
  );
}
