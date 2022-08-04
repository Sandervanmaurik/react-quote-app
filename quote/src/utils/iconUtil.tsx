import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import React from 'react';


const CustomFaIcon = ({ name }: any) => {
    const FaIcon = FaIcons[name];
    if (!FaIcon) return <p>Icon not found!</p>;
  
    return (<FaIcon />);
  };