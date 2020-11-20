import React from 'react';
import './TextInput.scss';
import Heading from '../Heading';

export default function TextInput({
  label,
  required,
  placeholder,
  size,
  onChange,
  name,
  defaultValue,
  type,
  error,
  change,
  inlineLabel,
  disabled,
  className,
}) {
  // size long means textarea, otherwise it's regular text size
  const inputType = type !== undefined ? type : 'text';
  const requiredBoolean = required !== undefined ? required : false;
  const errorState = error ? 'error' : '';
  const composedClassName = `${errorState} ${className}`;

  return (
    <div className="text-input">
      {label !== undefined ? (
        <>
          {inlineLabel ? (
            <label htmlFor={label} className="inlineLabel">
              <Heading type="h5">{label}</Heading>
            </label>
          ) : (
            <label htmlFor={label}>
              <Heading type="h5">{label}</Heading>
            </label>
          )}
        </>
      ) : null}
      {size === 'long' ? (
        <textarea
          id={name}
          rows="6"
          cols="40"
          required={requiredBoolean}
          placeholder={placeholder}
          value={defaultValue}
          onChange={event => onChange(event)}
          className={composedClassName}
          onBlur={change}
          disabled={disabled}
          name={name}
        />
      ) : (
        <input
          id={name}
          placeholder={placeholder}
          required={requiredBoolean}
          type={inputType}
          onChange={event => onChange(event)}
          defaultValue={defaultValue}
          className={composedClassName}
          onBlur={change}
          disabled={disabled}
          name={name}
        />
      )}
    </div>
  );
}
