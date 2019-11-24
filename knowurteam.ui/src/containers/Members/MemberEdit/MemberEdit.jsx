import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actionsIndex";
import alertify from "alertifyjs";

import "./MemberEdit.css";
import UserCard from "../../../components/Cards/UserCard/UserCard";
import EditProfile from "./EditProfile";

class MemberEdit extends Component {
  state = {
    activeTab: "1",
    userInfo: {
      introduction: "",
      occupation: "",
      actvities: [],
      company: ""
    }
  };

  async componentDidMount() {
    const { decodedToken } = this.props;
    await this.props.onGetUser(decodedToken.nameid);
    const { user } = this.props;
    const userInfo = { ...this.state.userInfo };

    if (user) {
      userInfo.introduction = !user.introduction ? "" : user.introduction;
      userInfo.occupation = !user.occupation ? "" : user.occupation;
      userInfo.company = !user.company ? "" : user.company;
      //userInfo.actvities = !user.actvities ? [] : user.actvities;
      this.setState({ userInfo });
    }
  }

  toggleHandler = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  handleUpdateUser = () => {
    const { decodedToken: currentUser, user } = this.props;
    const { userInfo: updatedUser } = this.state;

    user.introduction = updatedUser.introduction;
    user.occupation = updatedUser.occupation;
    user.company = updatedUser.company;
    //user.actvities = updatedUser.actvities;

    this.props.onUpdateUser(currentUser.nameid, user).then(() => {
      if (this.props.error)
        alertify.warning("You need to modify some fields before update");
      else alertify.success("Profile updated succesfully");
    });
  };

  handleChange = event => {
    const userInfo = { ...this.state.userInfo };
    userInfo[event.target.name] = event.target.value;

    this.setState({ userInfo });
  };

  render() {
    const { user } = this.props;
    const { userInfo } = this.state;

    let userCard = <p>Nothing to see</p>;
    let editProfile = <p>Edit Profile Area</p>;
    if (user) {
      userCard = (
        <UserCard user={user} type="save" save={this.handleUpdateUser} />
      );
      editProfile = (
        <EditProfile
          user={userInfo}
          submit={this.handleUpdateUser}
          handleChange={this.handleChange}
        />
      );
    }
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-4">
            <h1>Your profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">{userCard}</div>
          <div className="col-sm-8">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames(
                    {
                      active: this.state.activeTab === "1"
                    },
                    {
                      "navlink-active": this.state.activeTab === "1"
                    }
                  )}
                  onClick={() => {
                    this.toggleHandler("1");
                  }}
                >
                  Edit Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    {
                      active: this.state.activeTab === "2"
                    },
                    {
                      "navlink-active": this.state.activeTab === "2"
                    }
                  )}
                  onClick={() => {
                    this.toggleHandler("2");
                  }}
                >
                  Edit Photos
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    {
                      active: this.state.activeTab === "3"
                    },
                    {
                      "navlink-active": this.state.activeTab === "3"
                    }
                  )}
                  onClick={() => {
                    this.toggleHandler("3");
                  }}
                >
                  Edit Activities
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">{editProfile}</Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">{"Photo Editor"}</Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">{"Activity Editor"}</Col>
                </Row>
              </TabPane>
            </TabContent>
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
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: id => dispatch(actions.getUser(id)),
    onUpdateUser: (id, user) => dispatch(actions.updateUser(id, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberEdit);
