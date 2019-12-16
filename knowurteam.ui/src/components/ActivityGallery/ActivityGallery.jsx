import React, { Fragment } from 'react';

import MemberGallery from './MemberGallery';

const ActivityGallery = ({ activities }) => {
  let memberGallery = <p>Te user Has no activities</p>
  if (activities) {
    memberGallery = activities.map(activity => (
      <MemberGallery
        activity={activity}
      />
    ));
  }
  return (
    <Fragment>
      <h1>Activities</h1>
      <div className='row'>{memberGallery}</div>
    </Fragment>
  );
};

export default ActivityGallery;
