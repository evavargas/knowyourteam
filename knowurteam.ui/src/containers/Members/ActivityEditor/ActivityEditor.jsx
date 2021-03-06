import React from 'react';
import Joi from 'joi-browser';
import alertify from 'alertifyjs';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/actionsIndex';
import MemberActivity from '../MemberActivity/MemberActivity';
import Calendar from 'react-calendar';
import Button from './../../../components/UI/Button';
import Form from '../../../components/UI/Form';

export class ActivityEditor extends Form {
    state = {
        formatDate: '',
        date: new Date(),
        data: {
            description: '',
            dateOfRealization: new Date()
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
        const { decodedToken, user, onAddActivity } = this.props;
        let activity = { ...this.state.data };
        activity.dateOfRealization = this.state.date;
        
        alertify.defaults.theme.ok = 'btn btn-primary';
        alertify.defaults.theme.cancel = 'btn btn-warning';
        alertify.confirm(
            'Wait... Before continue',
            'Are you sure you want to add this activity?',
            async () => {
                await onAddActivity(decodedToken.nameid, activity, user);
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
            },
            () => { }
        );
    };
    render() {
        const { ...activity } = this.state.data;
        const { user } = this.props;
        let activityZone = (
            <div>
                <h3>Add Activities</h3>
                <p>Activity to Upload</p>
                <div className='form-inline'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Description:</label>
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
                            bsClasses='btn btn-outline-success'
                            disabled={activity.description.length <= 4}
                            clicked={this.doSubmit}
                        ><span className='fa fa-plus-square-o' aria-hidden="true" />Upload Activity
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
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'><div id='secItems'>
                        <h4>Realizated:</h4>{memberActivity}</div></div>
                    <aside className='col-sm-8'>{activityZone}</aside>
                    <aside className='col-sm-12' />
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
