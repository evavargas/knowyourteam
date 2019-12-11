import React from 'react';

const MemberGallery = ({ activity }) => {

  return (
    <li>
      <div className='description'>
        <span className='item-description' >{activity.description}</span>
        <span className='item-date' >{activity.dateofRealization}</span>
      </div>
    </li>
  );


};

export default MemberGallery;
