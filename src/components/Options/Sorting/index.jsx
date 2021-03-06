import React, { Component } from "react";
import PropTypes from "prop-types";
import Backdrop from "../../Backdrop/index";
import "./style.css";

class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sortBy: "alphabetical-ascending",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSortType = this.handleSortType.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  }

  handleKeyDown() {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  }

  handleSortType(evt) {
    this.setState(
      (prevState) => {
        return { open: !prevState.open, sortBy: evt.target.dataset.sortby };
      },
      () => {
        const { getSortType } = this.props;
        const { sortBy } = this.state;
        getSortType(sortBy);
      }
    );
  }

  render() {
    const { open } = this.state;
    return (
      <div className="Sorting">
        {open && <Backdrop onClick={this.handleClick} />}
        <i
          className="fas fa-sort-alpha-up"
          onClick={this.handleClick}
          role="button"
          tabIndex={0}
          aria-label="menu"
          onKeyDown={this.handleKeyDown}
        />
        {open && (
          <div className="card-menu_list">
            <ul>
              <li
                onClick={(this.handleClick, this.handleSortType)}
                role="button"
                data-sortby="alphabetical-ascending"
                tabIndex={0}
                aria-label="Sort By Alphabetical-ascending"
                onKeyDown={this.handleKeyDown}
              >
                Sort By Alphabetical Ascending
              </li>
              <li
                onClick={(this.handleClick, this.handleSortType)}
                role="button"
                tabIndex={0}
                data-sortby="alphabetical-dscending"
                aria-label="Sort By Alphabetical Dscending"
                onKeyDown={this.handleKeyDown}
              >
                Sort By Alphabetical Dscending
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Sorting.propTypes = {
  getSortType: PropTypes.func.isRequired,
};

export default Sorting;
