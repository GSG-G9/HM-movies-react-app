import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./style.css";

function LinkItem(props) {
  const { nameOfClass, text, iconsClass, to, withIcon, handleShowHide } = props;
  return (
    <>
      <li
        role='button'
        tabIndex='0'
        onKeyDown={() => handleShowHide()}
        className={nameOfClass}
        onClick={handleShowHide}
      >
        {withIcon && <i className={`fas ${iconsClass}`} />}
        <Link to={`/${to}`}>{text}</Link>
      </li>
    </>
	);
}

LinkItem.propTypes = {
	nameOfClass: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	iconsClass: PropTypes.string,
	to: PropTypes.string.isRequired,
	withIcon: PropTypes.bool.isRequired,
	handleShowHide:PropTypes.func
};

LinkItem.defaultProps = {
	iconsClass: '',
	handleShowHide:()=>{}
};
export default LinkItem;
