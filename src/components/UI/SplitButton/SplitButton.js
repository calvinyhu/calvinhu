import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SplitButton = props => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const handleDropdownClick = _ => setIsShowDropdown(!isShowDropdown);

  const btnGroupClasses = classnames({
    ['btn-group']: true,
    ['show']: isShowDropdown,
  });

  const dropdownMenuClasses = classnames({
    ['dropdown-menu']: true,
    ['show']: isShowDropdown,
  });

  return (
    <div class={btnGroupClasses}>
      <button
        type="button"
        class="btn btn-danger"
        onClick={props.handleMainAction}
      >
        Action
      </button>
      <button
        type="button"
        class="btn btn-danger dropdown-toggle dropdown-toggle-split"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={isShowDropdown}
        onClick={handleDropdownClick}
      >
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class={dropdownMenuClasses}>
        {props.options.map(option => (
          <a
            href={option.href}
            class="btn btn-link"
            role="button"
            aria-pressed="true"
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
};

SplitButton.propTypes = {
  handleMainAction: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SplitButton;
