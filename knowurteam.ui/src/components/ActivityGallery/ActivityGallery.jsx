import React from 'react';
import './ActivityGallery.css';

const ActivityGallery = ({ activities }) => {
  let items = [];
  activities.forEach(activity => {
    let item = {
      image: 'activity.png',
      description: activity.description,
      dateofRealization: activity.dateofRealization
    };
    items.push(item);
  });
  //header: 'findyourMatch.com'

  return (
    <div className='card'>
      <h1>Activities</h1>
      <ul>
        {items.map(activity=>
          <li>
<span>{activity.description}</span>
<span>{activity.date}</span>
          </li>
          )
        }
      </ul>
    </div>
  );
};

export default ActivityGallery;
//TODO: Modificar Carousel
