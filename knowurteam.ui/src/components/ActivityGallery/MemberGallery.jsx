import React from 'react';
import './MemberGallery.css';
const MemberGallery = ({ activity }) => {

  return (
    <li class='item'>
      <div class='description'>
        <span className='item-description' >{activity.description}</span>
        <span className='item-date' >{activity.dateofRealization}</span>
      </div>
    </li>
  );


};

export default MemberGallery;
