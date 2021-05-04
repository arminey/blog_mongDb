import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const sidebarData = [
  {
    title: 'Username',
    name: 'user',
    path: '/auth',
    icon: <FaIcons.FaUserCircle />,
    cName: 'nav-text'
  },
  {
    title: '',
    name: '',
    path: '',
    icon: '',
    cName: 'nav-text'
  },
  {
    title: 'Home',
    name: 'home',
    path: '/profile',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Articles',
    name: 'articles',
    path: '/api/articles',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Categories',
    name: 'categories',
    path: '/api/categories',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Users',
    name: 'users',
    path: '/api/users',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  }
];