import React from 'react';
import { Link } from 'react-router-dom';
import './baselink.scss';

const BaseLink = ({
  children,
  link,
  className,
  clickEvent,
  target,
  internal,
  ...props
}) => {
  const blankTarget = target ? '_blank' : '';
  const referrer = target ? 'noreferrer' : '';
  const newLink = link || null;
  const composedClassName = className || '';

  const events = internal ? (
    <Link
      to={newLink}
      data-testid="id"
      className={`baselink ${composedClassName}`}
    >
      {children}
    </Link>
  ) : (
    <a
      href={newLink}
      data-testid="id"
      className={`baselink ${composedClassName}`}
      target={blankTarget}
      rel={referrer}
      onClick={clickEvent}
    >
      {children}
    </a>
  );
  return events;
};
export default BaseLink;
