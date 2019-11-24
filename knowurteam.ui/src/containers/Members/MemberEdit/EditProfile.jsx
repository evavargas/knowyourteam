import React from 'react';
import GenericInput from './../../../components/UI/GenericInput';

const EditProfile = ({ user, submit, handleChange }) => {
  return (
    <form onSubmit={submit}>
      <h4>Description</h4>
      <textarea
        name='introduction'
        id=''
        rows='6'
        className='form-control'
        value={user.introduction}
        onChange={handleChange}
      />
      <h4>Details:</h4>
      <div className='form-inline'>
        <label htmlFor='company' style={{ margin: '0 3px 0 0' }}>
          Company:
        </label>
        <GenericInput
          type='text'
          classes='form-control'
          name='company'
          value={user.company}
          onChange={handleChange}
        />
        <label htmlFor='occupation' style={{ margin: '0 3px 0 8px' }}>
        Occupation
        </label>
        <GenericInput
          type='text'
          classes='form-control'
          name='occupation'
          value={user.occupation}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default EditProfile;
