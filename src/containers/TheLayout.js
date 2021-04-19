import React, { Component } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import Login from "../views/pages/login/Login";

import fireApp from "firebase/app";

// SOL RELATED
import web3 from "../web3.js";
import profileAbi from "../profile";

// const playerOne = "0xc59dBCe5D155D3Ef59D7393996a5252604BF6eF0";

// I make then 2 different variables as I try to make these 2 different scenarios detailed as possible.
// In our frontend these 2 variables will be the same one
// const address = playerOne;

// For testing purposes only!
// const playerTwo = "0xE6123F02ebc3528f29F23E79797744B88a0Cb851";

// const name = "test_name";

const compiledBinaryContract = require("../solidity/build/BinaryContract.json");

// const profile = new web3.eth.Contract(profileAbi, playerOne);

// FIREBASE RELATED
require("firebase/database");
const { firebaseConfig } = require("../firebaseConfig");
fireApp.initializeApp(firebaseConfig);
var database = fireApp.database();

export class TheLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchangesBrokenData: [],
      allExchanges: [],
      totalRequests: 0,
      isLoggedIn: false,
      NotRegisteredMessage: "",
      userAddress: "",
      userName: "",
      profile: "",
    };
    this.setStateAndAmountOfExchanges = this.setStateAndAmountOfExchanges.bind(
      this
    );
    this.writeUserData = this.writeUserData.bind(this);
    this.readUserData = this.readUserData.bind(this);
    this.getAddressFromPhoneNumber = this.getAddressFromPhoneNumber.bind(this);
    this.isLoggedInCheck = this.isLoggedInCheck.bind(this);
    this.getFriendFromPhoneNumber = this.getFriendFromPhoneNumber.bind(this);
  }

  async componentDidMount() {
    if (this.state.profile !== "") {
      if (
        (await this.state.profile.methods.getAllExchanges().call())[0] !==
        undefined
      ) {
        var exchange = {};
        Promise.resolve(
          (exchange = (
            await this.state.profile.methods.getAllExchanges().call()
          )[0].transaction)
        ).then(this.setStateAndAmountOfExchanges());
      }
    }
  }

  //FIREBASE FUNCTIONS
  writeUserData = (phoneNumber, name, address) => {
    database.ref("users/" + phoneNumber).set({
      username: name,
      contractAddress: address,
    });
  };

  readUserData = async (phoneNumber) => {
    var address;
    await database
      .ref()
      .child("users")
      .child(phoneNumber)
      .get()
      .then(function (snapshot) {
        if (snapshot.exists()) {
          address = snapshot.val();
        } else {
          address = -1;
        }
      })
      .catch(function (error) {
        address = -1;
      });
    return address;
  };

  getFriendFromPhoneNumber = async (phoneNumber) => {
    var friend = await this.readUserData(phoneNumber);
    if (friend === -1) {
      console.log("The friend was not found!");
    }
    console.log(friend);
    return friend;
  };

  getAddressFromPhoneNumber = async (phoneNumber) => {
    var address = await this.readUserData(phoneNumber);
    console.log(address);
    if (address === -1) {
      console.log("The address was not found!");
    }
    console.log(address.contractAddress);
    return address.contractAddress;
  };

  isLoggedInCheck = async (phoneNumber) => {
    console.log("checking user");
    var check = await this.readUserData(phoneNumber);
    if (check !== -1) {
      console.log(`the name is ${check.username}`);
      // this.props.setUsername(check.username);
      // this.props.setUserAddress(check.contractAddress);
      this.setState({
        isLoggedIn: true,
        profile: new web3.eth.Contract(profileAbi, check.contractAddress),
        userAddress: check.contractAddress,
        userName: check.username,
      });
    } else {
      this.setState({ NotRegisteredMessage: "no such user" });
    }
  };

  setStateAndAmountOfExchanges = async () => {
    this.setState({
      exchangesBrokenData: await this.state.profile.methods
        .getAllExchanges()
        .call(),
    });
    this.setState({
      totalRequests: this.state.exchangesBrokenData.length,
    });
    this.setState({ allExchanges: [] });
    if (this.state.totalRequests > 0) {
      for (var index = 0; index < this.state.totalRequests; index++) {
        this.setState({
          allExchanges: [
            ...this.state.allExchanges,
            await this.state.profile.methods
              .getAllExchangesByIndex(index)
              .call(),
          ],
        });
      }
    }
  };

  render() {
    var main = [];
    main = this.state.isLoggedIn ? (
      <div className="c-app c-default-layout">
        <TheSidebar
          playerOne={this.state.userAddress}
          profile={this.state.profile}
          name={this.state.userName}
          compiledBinaryContract={compiledBinaryContract}
          address={this.state.userAddress}
          getAddressFromPhoneNumber={this.getAddressFromPhoneNumber}
          getFriendFromPhoneNumber={this.getFriendFromPhoneNumber}
          setStateAndAmountOfExchanges={this.setStateAndAmountOfExchanges}
        />
        <div className="c-wrapper">
          <TheHeader
            profile={this.state.profile}
            compiledBinaryContract={compiledBinaryContract}
            allExchanges={this.state.allExchanges}
            totalRequests={this.state.totalRequests}
            getAddressFromPhoneNumber={this.getAddressFromPhoneNumber}
          />
          <div className="c-body">
            <TheContent
              playerOne={this.state.userAddress}
              profile={this.state.profile}
              compiledBinaryContract={compiledBinaryContract}
              address={this.state.userAddress}
              name={this.state.userName}
              getAddressFromPhoneNumber={this.getAddressFromPhoneNumber}
              getFriendFromPhoneNumber={this.getFriendFromPhoneNumber}
              setStateAndAmountOfExchanges={this.setStateAndAmountOfExchanges}
            />
          </div>
          <TheFooter isLoggedInCheck={this.isLoggedInCheck} />
        </div>
      </div>
    ) : (
      <Login
        NotRegisteredMessage={this.state.NotRegisteredMessage}
        isLoggedInCheck={this.isLoggedInCheck}
        writeUserData={this.writeUserData}
        compiledBinaryContract={compiledBinaryContract}
      />
    );
    // console.log(this);
    return <>{main}</>;
  }
}

export default TheLayout;
