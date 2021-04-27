import React, { Component } from "react";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import web3 from "../../web3.js";
import profileAbi from "../../profile";
import { convertUnixTimeStamp } from "../../functions";

export class FriendRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchange: this.props.exchange,
      totalRequests: this.props.totalRequests,
    };
    this.confirmFriendRequest = this.confirmFriendRequest.bind(this);
    this.declineFriendRequest = this.declineFriendRequest.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.totalRequests !== prevProps.totalRequests) {
      this.forceUpdate();
    }
  }
  async confirmFriendRequest(event) {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    //getting friends address
    const friendsAddress =
      this.props.playerOne === this.props.source
        ? this.props.destination
        : this.props.source;

    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us friendsProfile address
    const friendsProfile = new web3.eth.Contract(profileAbi, friendsAddress);

    //Finding friend's exchange index:
    const friendExchanges = await friendsProfile.methods
      .getAllExchanges()
      .call();

    let friendRequestIndex = -1;
    const length = friendExchanges.length;
    // console.log(friendExchanges);
    // console.log(length);
    for (let index = 0; index < length; index++) {
      const friendExchange = await friendsProfile.methods
        .getAllExchangesByIndex(index)
        .call();
      //"0" represents addFriendRequest Enum
      if (
        // if it is a friendRequest and the source is my friend
        friendExchange.exchangePurpose === "0" &&
        friendExchange.exchangeDetails.source === friendsAddress
      ) {
        friendRequestIndex = index;
      }
    }

    await this.props.profile.methods
      .confirmFriendRequest(this.props.index, this.props.sourceName)
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await friendsProfile.methods
      .confirmFriendRequestNotRestricted(friendRequestIndex)
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await this.props.setStateAndAmountOfExchanges();
    this.forceUpdate();
  }

  declineFriendRequest = async (event) => {
    event.preventDefault();
    //getting users account
    const accounts = await web3.eth.getAccounts();

    //testing which address is not the user
    const friendsAddress =
      this.props.exchange.exchangeDetails.source === this.props.playerOne
        ? this.props.exchange.exchangeDetails.destination
        : this.props.exchange.exchangeDetails.source;
    //getting other participants profile
    const friendsProfile = new web3.eth.Contract(profileAbi, friendsAddress);
    //find the right friend exchange index
    let friendsExchangeIndex = -1;
    const friendsExchanges = await friendsProfile.methods
      .getAllExchanges()
      .call();
    const length = friendsExchanges.length;
    if (length > 0) {
      for (var friendsIndex = 0; friendsIndex < length; friendsIndex++) {
        let exchange = await friendsProfile.methods
          .getAllExchangesByIndex(friendsIndex)
          .call();
        if (
          exchange.exchangePurpose === this.props.exchange.exchangePurpose &&
          exchange.transaction.date === this.props.exchange.transaction.date
        ) {
          friendsExchangeIndex = friendsIndex;
          // console.log(exchange);
        }
      }

      await friendsProfile.methods.removeExchange(friendsExchangeIndex).send({
        from: accounts[0],
        gas: "2000000",
      });
      await this.props.profile.methods.removeExchange(this.props.index).send({
        from: accounts[0],
        gas: "2000000",
      });
      await this.props.setStateAndAmountOfExchanges();
      this.forceUpdate();
    }
  };

  render() {
    // console.log(this);
    let bodyMessage = "";
    let topMessage = "";
    const buttons = [];
    if (this.props.playerOne === this.props.source) {
      topMessage = "Pending...";
      bodyMessage = "Waiting for " + this.props.destinationName + " to accept";
      buttons.push(
        <div>
          <CButton
            size="sm"
            color="dark"
            className="buttons_inside_contract_list"
            onClick={this.declineFriendRequest}
          >
            cancel request
          </CButton>
        </div>
      );
    } else {
      topMessage = "From: " + this.props.destinationName;
      bodyMessage = this.props.destinationName + " sent you a friend request";
      buttons.push(
        <div>
          <CButton
            size="sm"
            color="secondary"
            className="buttons_inside_contract_list"
            onClick={this.confirmFriendRequest}
          >
            accept
          </CButton>
          <CButton
            size="sm"
            color="dark"
            className="buttons_inside_contract_list"
            onClick={this.declineFriendRequest}
          >
            refuse
          </CButton>
        </div>
      );
    }

    const date = convertUnixTimeStamp(this.props.creationDate);
    return (
      <div>
        <CCard color="info" className="text-white text-center">
          <CCardHeader>{topMessage}</CCardHeader>
          <CCardBody>
            <blockquote className="card-bodyquote">
              <h3>{bodyMessage}</h3>
              {date}
            </blockquote>

            <footer className="footer_contract_list_element">{buttons}</footer>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default FriendRequest;
