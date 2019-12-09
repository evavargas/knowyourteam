import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import * as actions from '../../store/actions/actionsIndex';
import MemberCard from './../../components/Cards/MemberCard/MemberCard';
import Pagination from '../../components/UI/Pagination';
import FilterHeader from './FilterHeader';

class Members extends Component {
  state = {
    currentPage: 1,
    pageSize: 4,
    userParams: {
      gender: '',
      minAge: '',
      maxAge: '',
      orderBy: ''
    },
    genderList: [
      {
        value: 'male',
        display: 'Males'
      },
      {
        value: 'female',
        display: 'Females'
      },
      {
        value: 'others',
        display: 'Others'
      }
    ],
    orderByList: [
      { value: 'lastActive', display: 'Last Active' },
      { value: 'created', display: 'Newest Members' }
    ]
  };

  componentDidMount() {
    const { currentPage, pageSize } = this.state;
    const { currentUser, onGetUsers } = this.props;

    const userParams = { ...this.state.userParams };
    userParams.gender = currentUser.gender === 'female' ? 'male' : 'female'; //other
    userParams.minAge = 18;
    userParams.maxAge = 99;
    userParams.orderBy = 'lastActive';
    onGetUsers(currentPage, pageSize, userParams)
      .then(() => {
        const { pagination } = this.props;
        this.setState({ userParams });
        this.setState({ currentPage: pagination.currentPage });
        // console.log('users', users);
      })
      .catch(error => {
        if (this.props.error) {
          alertify.error('Problem retrieving data');
          alertify.warning(this.props.error.response.statusText);
          this.props.history.push('/home');
        }
      });
  }

  loadUsers = page => {
    const { pageSize, userParams } = this.state;
    this.props.onGetUsers(page, pageSize, userParams).then(() => {
      this.setState({ currentPage: this.props.pagination.currentPage });
    });
    if (this.props.error) {
      alertify.error('Problem retrieving data');
    }
  };

  handleRedirectToDetail = id => {
    this.props.history.push('/members/' + id);
  };

  handlePageChange = page => {
    this.loadUsers(page);
  };

  handleOnChange = e => {
    const userParams = { ...this.state.userParams };
    userParams[e.target.name] = e.target.value;
    this.setState({ userParams });
  };

  handleApplyFilters = () => {
    this.loadUsers(1);
  };

  handleResetFilters = () => {
    const { userParams } = this.state;
    const { currentUser } = this.props;
    userParams.gender = currentUser.gender === 'female' ? 'male' : 'female';
    userParams.minAge = 18;
    userParams.maxAge = 99;
    this.loadUsers(1);
  };

  render() {
    const { users, pagination } = this.props;
    const { currentPage, userParams, genderList, orderByList } = this.state;
    let memberCardArea = <p>No matching users</p>;
    if (users) {
      memberCardArea = users.map(user => (
        <div key={user.id} className='col-lg-2 col-md-3 col-sm-6'>
          <MemberCard user={user} toDetail={this.handleRedirectToDetail} />
        </div>
      ));
    }

    let paginationInfoArea = <h2>Your matches - 0 - found</h2>;
    let paginationArea = <p>There is no pages</p>;
    if (pagination) {
      const { itemsPerPage, totalItems, totalPages } = pagination;
      paginationInfoArea = <h2>Your matches - {totalItems} found</h2>;
      paginationArea = (
        <Pagination
          itemsCount={totalItems}
          pageSize={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      );
    }

    return (
      <Fragment>
        <div className='text-center mt-3'>{paginationInfoArea}</div>
        <div className='container mt-3 justify-content-center'>
          <div>
            <FilterHeader
              userParams={userParams}
              applyFilters={this.handleApplyFilters}
              resetFilters={this.handleResetFilters}
              onChange={this.handleOnChange}
              genderList={genderList}
              orderByList={orderByList}
            />
          </div>
          <br />
          <div className='row justify-content-center'>{memberCardArea}</div>
        </div>
        <div className='d-flex justify-content-center'>{paginationArea}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    currentUser: state.auth.currentUser,
    pagination: state.user.pagination,
    error: state.user.error
  };
};

const mapDispacthToProps = dispatch => {
  return {
    onGetUsers: (pageNumber, pageSize, userParams) =>
      dispatch(actions.getUsers(pageNumber, pageSize, userParams))
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Members);
