import React from 'react';
import './Heading.scss';
import PropTypes from 'prop-types';

const Heading = ({ children, type, className, colour }) => {
  // const fonttype = type === 'h1' ? <h1>{children}</h1> : <h6>{children}</h6>;
  const composedClassName = className || '';
  const fontcolour = colour || 'royal';
  const style = `${composedClassName} ${fontcolour}`;
  switch (type) {
    case 'h1':
      return <h1 className={`h1 ${style}`}>{children}</h1>;
    case 'h2':
      return <h2 className={`h2 ${style}`}>{children}</h2>;
    case 'h3':
      return <h3 className={`h3 ${style}`}>{children}</h3>;
    case 'h4':
      return <h4 className={`h4 ${style}`}>{children}</h4>;
    case 'h5':
      return <h5 className={`h5 ${style}`}>{children}</h5>;
    case 'h6':
      return <h6 className={`h6 ${style}`}>{children}</h6>;
    default:
      return null;
  }
};

Heading.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  colour: PropTypes.string,
};

export default Heading;
