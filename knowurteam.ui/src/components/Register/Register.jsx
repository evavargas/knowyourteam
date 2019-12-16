import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from '../UI/Form';
import Calendar from 'react-calendar';
import Button from '../UI/Button';

import * as actions from '../../store/actions/actionsIndex';
import './Register.css';
class Register extends Form {
  state = {
    date: new Date(),
    formatDate: '',
    gender: 'female',
    selectedOption: 'female',
    data: {
      username: '',
      gender: '',
      dateOfBirth: new Date(),
      occupation: '',
      company: '',
      password: '',
      confirmPassword: ''
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    gender: Joi.required(),
    occupation: Joi.string().label('Occupation'),
    company: Joi.string().label('Company'),
    dateOfBirth: Joi.any(),
    password: Joi.string()
      .min(4)
      .max(10)
      .label('Password'),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .options({ language: { any: { allowOnly: 'must match Password' } } })
      .label('Password confirmation')
  };

  handleOptionChange = e => {
    let gender = e.target.value;
    this.setState({ selectedOption: gender, gender });
  };

  handleOnChangeDate = date => {
    this.setState({ date, formatDate: date.toLocaleDateString() });
  };

  doSubmit = async () => {
    let user = { ...this.state.data };
    user.gender = this.state.gender;
    user.dateOfBirth = this.state.date;

    this.props.onRegisterUser(user).then(() => {
      const { error, history } = this.props;
      if (!error) history.push('/members');
    });
    this.props.history.push('/members');
  };


  render() {
    return (
      <Fragment>
        <h2 className='text-center text-primary'>Sign Up</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          <label>Date of Birth</label>
          <Calendar
            onChange={this.handleOnChangeDate}
            value={this.state.date}
          />
          <input
            type='text'
            className='form-control'
            value={this.state.formatDate}
            readOnly
          />
          <div className='form-group text-center'>
            <label className='control-label' style={{ marginRight: '10px' }}>
              I am a:
            </label>
            <div className='custom-control custom-radio custom-control-inline'>
              <input
                type='radio'
                id='maleRadio'
                name='radio1'
                className='custom-control-input'
                value='male'
                checked={this.state.selectedOption === 'male'}
                onChange={e => this.handleOptionChange(e)}
              />
              <label className='custom-control-label' htmlFor='maleRadio'>
                Male
              </label>
            </div>
            <div className='custom-control custom-radio custom-control-inline'>
              <input
                type='radio'
                id='femaleRadio'
                name='radio2'
                className='custom-control-input'
                value='female'
                checked={this.state.selectedOption === 'female'}
                onChange={e => this.handleOptionChange(e)}
              />
              <label className='custom-control-label' htmlFor='femaleRadio'>
                Female
              </label>
            </div>
            <div className='custom-control custom-radio custom-control-inline'>
              <input
                type='radio'
                id='otherRadio'
                name='radio3'
                className='custom-control-input'
                value='other'
                checked={this.state.selectedOption === 'other'}
                onChange={e => this.handleOptionChange(e)}
              />
              <label className='custom-control-label' htmlFor='otherRadio'>
                Other
              </label>
            </div>
          </div>
          {this.renderInput('occupation', 'Occupation')}
          {this.renderInput('company', 'Company')}
          <label>Create a password</label>
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('confirmPassword', 'Confirm Password', 'password')}
          <div className='form-group text-center'>
            {this.renderButton('Register', 'btn-outline-primary')}
            <Button bsClasses='btn-outline-warning'
              clicked={this.props.onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: user => dispatch(actions.registerUser(user))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
