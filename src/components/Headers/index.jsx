import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom'
import LinkItem from "../LinkItem/index";
import Backdrop from "../Backdrop/index";
import "./style.css";
import {authContext} from '../Context'

function Headers() {
  
  const [state,setState] = useState(false)
  const {isAuth:isAuthenticated} = useContext(authContext)
  
	const handleClick = () => {
    return setState((open)=> !open)
	}

	const handleKeyDown = () =>  {
    return setState((open)=> !open)
	}

	const handleShowHide = () => {
    	return setState((open)=> !open)
  }

	return (
  <>
    <div className='Header'>
      {state && <Backdrop onClick={handleClick} />}
      <div className='Header-logo'>
        <Link to='/' className='Header-logo-text'>
          <h1 className='Header-logo_text'>HM</h1>
        </Link>
      </div>
      <div className='Header-userprofile'>
        {isAuthenticated && (
        <div
          className='menu-btn'
          onClick={handleClick}
          role='button'
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <span className='username-text'>User</span>
          <img src='' alt='' />
          <i className='fas fa-user' />
          <i className='fas fa-angle-down' />
        </div>
						)}

        {state ? (
          <div className={`userprofile-menu ${state && 'fadeIn'}`}>
            <ul className='user-nav-list'>
              <LinkItem
                nameOfClass='item-link'
                text='Profile'
                iconsClass='fa-id-card'
                to='profile'
                withIcon
              />
              <LinkItem
                nameOfClass='item-link'
                text='Setting'
                iconsClass='fa-cog'
                to='setting'
                withIcon
              />
              <LinkItem
                nameOfClass='item-link'
                text='Logout'
                iconsClass='fa-sign-out-alt'
                to='logout'
                handleShowHide={handleShowHide}
                withIcon
              />
            </ul>
          </div>
						) : null}
      </div>
    </div>
  </>
		);
	}




export default Headers;