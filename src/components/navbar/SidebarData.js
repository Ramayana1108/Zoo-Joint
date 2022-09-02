import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as SiIcons from 'react-icons/si';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import * as ImIcons from 'react-icons/im';
import * as FcIcons from 'react-icons/fc';

export const SidebarData = [
  {
    title: 'Users',
    path: '/users',
    icon: <FaIcons.FaUsers />,
    cName: 'nav-text'
  },
  {
    title: 'Animals',
    path: '/reports',
    icon: <GiIcons.GiFlatPawPrint />,
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/products',
    icon: <AiIcons.AiFillInfoCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Chatbot',
    path: '/chatbot',
    icon: <AiIcons.AiFillWechat />,
    cName: 'nav-text'
  },
  {
    title: 'Archives',
    path: '/messages',
    icon: <BsIcons.BsFillArchiveFill />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/support',
    icon: <ImIcons.ImExit />,
    cName: 'nav-text'
  }
];