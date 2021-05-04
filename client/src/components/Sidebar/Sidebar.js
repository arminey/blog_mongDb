import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { IconContext } from 'react-icons';
import { sidebarData } from './sidebarData';
import { AuthContext } from './../../shared/context/auth-context';

import './style.css';

const Sidebar = (props) => {
  const auth = useContext(AuthContext);
  const [ sidebar, setSidebar ] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogOut = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/users/logout/${auth.userId}`, {id: auth.userId}, { headers: {  Authorization: 'Bearer ' + auth.token } });  
    } catch (error) {
      console.error(error);
      return;
    }    
    auth.logout();
  }


  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          
          <Link to={'#'} className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p style={{margin: 'auto', color: 'white'}}>{props.title}</p>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to={'#'} className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key={'signout'} className={'nav-text'}>
              <Link to={''} onClick={handleLogOut}>
                <span>Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>


    </div>
  );
}

export default Sidebar;