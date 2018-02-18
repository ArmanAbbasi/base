import React from 'react';

const sectionStyles = {
  'textAlign': 'center',
  'padding': '0 20px',
  'paddingTop': '120px',
  'backgroundColor': 'rgba(223, 224, 236, .12)',
  'position': 'absolute',
  'top': 0,
  'bottom': 0,
  'left': 0,
  'right': 0
};

const headerStyles = {
  'margin': '0 auto 16px auto',
  'fontFamily': '\'Poppins Bold\', Helvetica, Arial, sans-serif',
  'fontSize': '24px',
  'lineHeight': '32px'
};

const articleStyles = {
  'margin': 0,
  'fontSize': '16px',
  'lineHeight': '28px'
};

const spacer = {
  'marginBottom': '16px'
};

const ServerError = ({
  line1 = 'some error occurred', line2 = 'Lorem ipsum', line3 = 'Lorem ipsum 2', line4 = 'Lorem ipsum 3', title = 'Oops, we have a problem!'
}) => (
  <section style={ sectionStyles }>
    <h1 style={ headerStyles }>{ title }</h1>
    <article style={ articleStyles }>
      <p>{ line1 }</p>
      <div style={ spacer }>{ line2 }</div>
      <p>{ line3 }</p>
      <p>{ line4 }</p>
    </article>
  </section>
);

export default ServerError;