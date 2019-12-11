import React, { Component } from 'react';
import Joi from 'joi-browser';
import alertify from 'alertifyjs';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/actionsIndex';
import MemberActivity from '../MemberActivity/MemberActivity';
import Calendar from 'react-calendar';
//import './ActivityEditor.css';
import Button from './../../../components/UI/Button';
import Form from '../../../components/UI/Form';

export class ActivityEditor extends Form {
    state = {
        formatDate: '',
        data: {
            description: '',
            dateOfRealization: new Date(),
            registrationDate: new Date()
        },
        errors: {}
    };
    schema = {
        description: Joi.string()
            .min(4)
            .max(20)
            .required()
            .label('Description'),
        dateOfRealization: Joi.any()
    };
    handleOptionChange = e => {
        let v = e.target.value;
        this.setState({ selectedOption: v, v });
    };
    handleOnChangeDate = date => {
        this.setState({ date, formatDate: date.toLocaleDateString() });
    };
    doSubmit = async () => {
        const {
            decodedToken,
            user,
            currentUser,
            onAddActivity //why?
        } = this.props;
        let activity = { ...this.state.data };
        alertify.confirm(
            'Wait... Before continue',
            'Are you sure you want to add this activity?',
            async () => {
                await onAddActivity(decodedToken.nameid, activity, user);
//                if (this.props.error) alertify.warning(this.props.error);
//                else alertify.succes('Activity has been deleted');
            },
            () => { }
            
        );
    };
    handleDeleteActivity = activityId => {
        const { decodedToken, user, onDeleteActivity } = this.props;
        alertify.defaults.theme.ok = 'btn btn-primary';
        alertify.defaults.theme.cancel = 'btn btn-warning';
        alertify.confirm(
            'Are you sure you want to delete this activity?',
            async () => {
                await onDeleteActivity(decodedToken.nameid, activityId, user);
                if (this.props.error) alertify.warning(this.props.error);
                else alertify.succes('Activity has been deleted');
            },
            () => { }
        );
    };

    render() {
        const { ...activity } = this.state.data;
        const { user } = this.props;
        let activityZone = (
            <div>
                <h4>Activity to Upload</h4>
                <div className='form-inline'>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('description', 'Description')}
                        <label>Date of realization:</label>
                        <Calendar
                            onChange={this.handleOnChangeDate}
                            value={this.state.data.dateOfRealization}
                        />
                        <input
                            type='text'
                            className='form-control'
                            value={this.state.formatDate}
                            readOnly
                        />
                        <Button
                            type='button'
                            bsClasses='btn btn-succes btn-s'
                            disabled={activity.description.length <= 4}
                            clicked={this.doSubmit}
                        ><span className='fa fa-upload' />Upload Activity
                        </Button>
                    </form>
                </div>
            </div>
        );
        let memberActivity = <p>The user has no activities</p>;
        if (user) {
            memberActivity = user.activities.map(activity => (
                <MemberActivity
                    key={activity.id}
                    activity={activity}
                    deleteActivity={this.handleDeleteActivity}
                />
            ));
        }
        return (
            <div>
                <div className='row'>{memberActivity}</div>
                <div className='row mt-3'>
                    <div className='col'>
                        <h3>Add Activities</h3>
                        <div className='card bg-fadded p-3 text-center'>
                            <aside>{activityZone}</aside>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user,
        decodedToken: state.auth.decodedToken,
        error: state.user.error,
        currentUser: state.auth.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddActivity: (id, activity, user) =>
            dispatch(actions.addActivity(id, activity, user)),
        onDeleteActivity: (id, activityId, user) =>
            dispatch(actions.deleteActivity(id, activityId, user)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityEditor);
//TODO: REVISAR!/////////////////////////////////////////////////////////////
