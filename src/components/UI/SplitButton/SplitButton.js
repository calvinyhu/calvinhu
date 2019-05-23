import React, { Component } from 'react';

class SplitButton extends Component {
  render() {
    return (
      <div class="btn-group">
        <button type="button" class="btn btn-danger">
          Action
        </button>
        <button
          type="button"
          class="btn btn-danger dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">
            Action
          </a>
          <a class="dropdown-item" href="#">
            Another action
          </a>
          <a class="dropdown-item" href="#">
            Something else here
          </a>
          <div class="dropdown-divider" />
          <a class="dropdown-item" href="#">
            Separated link
          </a>
        </div>
      </div>
    );
  }
}

export default SplitButton;