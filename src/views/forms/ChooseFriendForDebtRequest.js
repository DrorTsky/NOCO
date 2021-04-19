import React, { Component } from "react";

import Friend from "./Friend";

import {
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
} from "@coreui/react";

export class ChooseFriendForDebtRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendsList: [],
      friend: [],
      allFriends: [],
    };

    this.onCheckMyFriends = this.onCheckMyFriends.bind(this);
    // this.getFriend = this.getFriend.bind(this);
  }

  async componentDidMount() {
    // console.log(this.state.friendsList);
    let ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      await ethereum.enable();
    }
    this.onCheckMyFriends();
  }

  onCheckMyFriends = async () => {
    // console.log("your friends are:");
    // console.log(await profile.methods.getFriends().call());
    this.setState({
      friendsList: await this.props.profile.methods.getFriends().call(),
    });
    const length = this.state.friendsList.length;
    if (length > 0) {
      for (var index = 0; index < length; index++) {
        this.setState({
          allFriends: [
            ...this.state.allFriends,
            await this.props.profile.methods.getFriendsByIndex(index).call(),
          ],
        });
      }
    }
  };

  render() {
    const friends = [];
    const amountOfFriends = this.state.friendsList.length;
    // console.log(this.state.allFriends);

    for (const [index, value] of Object.entries(this.state.allFriends)) {
      // console.log(value);
      friends.push(
        <Friend
          key={index}
          {...value}
          playerOne={this.props.playerOne}
          friendAddress={value.friendAddress}
          profile={this.props.profile}
        />
      );
    }
    const isFriendsListEmpty = this.state.friendsList.length;

    return (
      <div>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader className="align_center">Choose a friend</CCardHeader>
            <CCardBody className="wrapper">
              {isFriendsListEmpty === 0 ? (
                <h1>no friends yet</h1>
              ) : (
                <CButtonGroup vertical>{friends}</CButtonGroup>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </div>
    );
  }
}

export default ChooseFriendForDebtRequest;
