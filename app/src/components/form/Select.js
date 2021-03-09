import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Select = forwardRef((props, ref) => {
  return (
    <div
      className={`grid ${
        props.labelPosition === 'ADJACENT' || props.labelPosition === 'JUSTIFIED'
          ? 'gap-x-4 grid-cols-2'
          : 'gap-y-2 grid-cols-1'
      }`}
    >
      <label
        htmlFor={props.name}
        className={`font-medium ${props.labelPosition === 'ADJACENT' ? 'text-right' : 'text-left'}`}
      >
        {props.label}
      </label>
      <select ref={ref} id={props.name} name={props.name}>
        {props.placeholder ? (
          <option value={null}>{props.placeholder}</option>
        ) : null}
        {props.options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
});

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
};

Select.defaultProps = {
  options: [],
};

export default Select;
