import React from 'react';
import Button from '../../../components/UI/Button';
import './MemberActivity.css';

const MemberActivity = ({ activity, deleteActivity }) => {

  return (
    <li className='item'>
      <div className='description'>
        <span className='item-description' >{activity.description}</span>
        <span className='item-date' >{activity.dateofRealization}</span>
      </div>
      <Button
        type='button'
        bsClasses='btn btn-sm btn-danger'
        clicked={() => deleteActivity(activity.id)}
      >
        <i className='fa fa-trash-o' />
      </Button>
    </li>
  );
};

export default MemberActivity;
