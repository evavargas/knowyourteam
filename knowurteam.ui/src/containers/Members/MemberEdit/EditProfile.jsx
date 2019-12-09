import React from 'react';
import GenericInput from './../../../components/UI/GenericInput';

const EditProfile = ({ user, submit, handleChange }) => {
  return (
    <form onSubmit={submit}>
      <h4>Description</h4>
      <textarea
        name='introduction'
        id=''
        rows='4'
        className='form-control'
        value={user.introduction}
        onChange={handleChange}
      />
      <h4>Job Details:</h4>
      <div className='form-inline'>
        <label htmlFor='occupation' style={{ margin: '0 3px 0 0' }}>
          Occupation:
        </label>
        <GenericInput
          type='text'
          classes='form-control'
          name='occupation'
          value={user.occupation}
          onChange={handleChange}
        />
        <label htmlFor='company' style={{ margin: '0 3px 0 8px' }}>
          Company:
        </label>
        <GenericInput
          type='text'
          classes='form-control'
          name='company'
          value={user.company}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};
export default EditProfile;
