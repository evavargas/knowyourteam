import React, { Fragment } from 'react';
import './ActivityGallery.css';
import MemberGallery from './MemberGallery';

const ActivityGallery = ({ activities }) => {
  const { user } = this.props;
  let memberGallery = <p>Te user Has no activities</p>
  if (user) {
    memberGallery = user.activities.map(activity => (
      <MemberGallery
        key={activity.id}
        activity={activity}
      />
    ));
  }
  return (
    <Fragment>
      <h1>Activities</h1>
      <div> className='row'>{memberGallery}</div>
    </Fragment>
  );
};

export default ActivityGallery;
//TODO: Modificar Carousel
