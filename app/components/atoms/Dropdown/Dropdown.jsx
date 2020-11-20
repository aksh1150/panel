import React from 'react';
import Select from 'react-select';
import Heading from '../Heading';

import './Dropdown.scss';

export default function Dropdown({
  label,
  options,
  width,
  placeholder,
  onChange,
  error,
  defaultValue,
  inlineLabel,
  disabled,
}) {
  // Options for width are "half" and "full"
  const size = width ? width : 'half';
  const errorState = error ? 'error' : '';

  // const placeholderText = placeholder ? placeholder : '';
  const placeholderText = defaultValue ? defaultValue : placeholder;
  const composedClassName = `${errorState} extraClass`;

  const selectOptions = options.map(option => {
    return {
      value: option.value,
      label: option.label,
    };
  });
  // console.log(defaultValue);
  return (
    <div className="Dropdown">
      {inlineLabel ? (
        <label htmlFor={label} className="inlineLabel">
          <Heading type="h5">{label}</Heading>
        </label>
      ) : (
        <label htmlFor={label}>
          <Heading type="h5">{label}</Heading>
        </label>
      )}

      <Select
        options={selectOptions}
        className={composedClassName}
        placeholder={placeholderText}
        onChange={event => onChange(event)}
        isDisabled={disabled}
        defaultValue={
          defaultValue
            ? { value: defaultValue, label: defaultValue }
            : placeholderText
        }
      />
    </div>
  );
}
