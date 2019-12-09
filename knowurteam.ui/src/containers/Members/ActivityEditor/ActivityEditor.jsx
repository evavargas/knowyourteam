import React, { Component } from 'react';
import alertify from 'alertifyjs';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/actionsIndex';
import MemberActivity from '../MemberActivity/MemberActivity';
//import './ActivityEditor.css';
import Button from './../../../components/UI/Button';
import GenericInput from './../../../components/UI/GenericInput';

//largo de la cadena
export class ActivityEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formatDate: '',
            activity: {
                description: '',
                dateOfRealization: new Date(),
                registrationDate: new Date()
            },
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {

        event.preventDefault();
    }

    handleUploadActivity = () => {
        const {
            decodedToken,
            user,
            currentUser,
            onAddActivity,
            onSetMainUser
        } = this.props;
        const { activityForUpload } = this.state.activity;
        onAddActivity(decodedToken.nameid, activityForUpload, user).then(() => {
            let updateCurrentUser = { ...currentUser };
            onSetMainUser(updateCurrentUser);
        });
        this.state.setState({ description: '', dateOfRealization: '' });
    };

    handleDeleteActivity = activityId => {
        const { decodedToken, user, onDeleteActivity } = this.props;

        alertify.defaults.theme.ok = 'btn btn-primary';
        alertify.defaults.theme.cancel = 'btn btn-warning';
        alertify.confirm(
            'Wait... Before continue',
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
        const { ...activity } = this.state.activity;
        const { user } = this.props;
        let activityZone = (
            <div>
                <h4>Activity to Upload</h4>
                <div className='form-inline'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='description' style={{ margin: '0 3px 0 0' }}>
                            Description:
                        </label>
                        <GenericInput
                            type='text'
                            classes='form-control'
                            name='Activity'
                            value={activity.description}
                            onChange={this.handleChange}
                        />
                        <label htmlFor='date' style={{ margin: '0 3px 0 8px' }}>
                            Date of realization:
                            </label>
                        <GenericInput
                            type='text'
                            classes='form-control'
                            name='Date'
                            value={activity.dateOfRealization}
                            onChange={this.handleChange}
                        />
                        <Button
                            type='button'
                            bsClasses='btn btn-succes btn-s'
                            disabled={activity.description.length === 0}
                            clicked={this.handleUploadActivity}
                        >
                            <span className='fa fa-upload' />Upload Activity
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
        onSetMainUser: currentUser => dispatch(actions.setMainUser(currentUser))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityEditor);
//TODO: REVISAR!/////////////////////////////////////////////////////////////
