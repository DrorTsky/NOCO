import React, { Component } from "react";
// import fireApp from "firebase/app";

import AddDebt from "../forms/AddDebt";
import AddFriend from "../forms/AddFriend";
import AllContracts from "./AllContracts";
// TEST RELATED
import web3 from "../../web3.js";
import profileAbi from "../../profile";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Exchanges from "../requests/Exchanges";

// // FIREBASE RELATED
// require("firebase/database");
// const { firebaseConfig } = require("../../firebaseConfig");
// fireApp.initializeApp(firebaseConfig);
// var database = fireApp.database();

//...................................................................................................................

// **************************** */

// const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
// const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsAddress: this.props.playerTwo,
      friendRequestIndex: "",
      playerOne: this.props.playerOne,
      profile: this.props.profile,
      address: this.props.address,
      compiledBinaryContract: this.props.compiledBinaryContract,
      name: this.props.name,
      providedAmount: "",
      playerTwo: this.props.playerTwo,
      friendsList: [],
      exchanges: {},
      contractsList: [],
      contractAndProps: {},
    };

    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.addFriendFormSubmit = this.addFriendFormSubmit.bind(this);
    this.onSubmitConfirmFriendRequest = this.onSubmitConfirmFriendRequest.bind(
      this
    );
    this.onCheckMyFriends = this.onCheckMyFriends.bind(this);
    this.onRemoveFriendsList = this.onRemoveFriendsList.bind(this);
    this.updateRemovedFriends = this.updateRemovedFriends.bind(this);
    this.onSubmitAddDebtRequest = this.onSubmitAddDebtRequest.bind(this);
    this.onSubmitConfirmDebtRequest = this.onSubmitConfirmDebtRequest.bind(
      this
    );
    // this.writeUserData = this.writeUserData.bind(this);
    // this.readUserData = this.readUserData.bind(this);
    // this.getAddressFromPhoneNumber = this.getAddressFromPhoneNumber.bind(this);
  }

  // //FIREBASE FUNCTIONS
  // writeUserData(phoneNumber, name, address) {
  //   database
  //     .ref("users/" + phoneNumber)
  //     .set({
  //       username: name,
  //       contractAddress: address,
  //     })
  //     .then(() => database.goOffline());
  // }

  // readUserData = async (phoneNumber) => {
  //   var address;
  //   await database
  //     .ref()
  //     .child("users")
  //     .child(phoneNumber)
  //     .get()
  //     .then(function (snapshot) {
  //       if (snapshot.exists()) {
  //         address = snapshot.val();
  //       } else {
  //         address = -1;
  //       }
  //     })
  //     .catch(function (error) {
  //       address = -1;
  //     })
  //     .then(() => database.goOffline());
  //   console.log(address);
  //   return address;
  // };

  // getAddressFromPhoneNumber = async (phoneNumber) => {
  //   var address = await this.readUserData(phoneNumber);
  //   console.log(address);
  //   if (address === -1) {
  //     console.log("The address was not found!");
  //   }
  //   // assert.notStrictEqual(-1, address, "The address was not found!");
  //   console.log(address.contractAddress);
  //   return address.contractAddress;
  // };

  async componentDidMount() {
    // console.log(this.state.friendsList);
    let ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      await ethereum.enable();
    }
    // this.onCheckMyExchanges();
    this.onCheckMyContracts();
    this.onCheckMyFriends();
    console.log(this);
  }

  // *****************************************************
  //                  ADD FRIEND
  // *****************************************************
  addFriendFormSubmit = async (event) => {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();
    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us friendsProfile address
    const friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.state.friendsAddress
    );

    // NOTE: that's how I convert between a batch request and 2 seperate "send" requests:

    makeBatchRequest([
      // add both of the exchanges in a batch request.
      this.state.profile.methods.addFriendRequest(
        this.state.friendsAddress,
        this.state.name
      ).send,
      friendsProfile.methods.addFriendRequestNotRestricted(
        this.state.address,
        this.state.name
      ).send,
    ]);
    function makeBatchRequest(calls) {
      let batch = new web3.BatchRequest();
      calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request(
            { from: accounts[0], gas: "1000000" },
            (err, data) => {
              if (err) rej(err);
              else res(data);
            }
          );
          batch.add(req);
        });
      });
      batch.execute();
    }
  };

  // *****************************************************
  //                  CONFIRM FRIEND
  // *****************************************************
  async onSubmitConfirmFriendRequest(event) {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us friendsProfile address
    const friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.state.friendsAddress
    );

    //Finding friend's exchange index:
    let friendExchanges = await friendsProfile.methods.getAllExchanges().call();

    let friendRequestIndex;

    for (let index = 0; index < friendExchanges.length; index++) {
      const friendExchange = friendExchanges[index];

      //"0" represents addFriendRequest Enum
      if (
        // if it is a friendRequest and the source is my friend
        friendExchange.exchangePurpose === "0" &&
        friendExchange.exchangeDetails.source === this.state.friendsAddress
      ) {
        friendRequestIndex = index;
      }
    }

    makeBatchRequest([
      // add both of the exchanges in a batch request.

      // In our frontend the user will choose the correct request, here I test it with 0 as there is only one request
      this.state.profile.methods.confirmFriendRequest(0, this.state.name).send,
      friendsProfile.methods.confirmFriendRequestNotRestricted(
        friendRequestIndex
      ).send,
    ]);
    function makeBatchRequest(calls) {
      let batch = new web3.BatchRequest();

      calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request(
            { from: accounts[0], gas: "1000000" },
            (err, data) => {
              if (err) rej(err);
              else res(data);
            }
          );
          batch.add(req);
        });
      });
      batch.execute();
    }
  }
  // *****************************************************
  //                  GET FRIENDS
  // *****************************************************

  onCheckMyFriends = async () => {
    // console.log("your friends are:");
    // console.log(await profile.methods.getFriends().call());
    this.setState({
      friendsList: await this.state.profile.methods.getFriends().call(),
    });
    // console.log(this.state);
  };

  // *****************************************************
  //                  REMOVE FRIENDS
  // *****************************************************
  async updateRemovedFriends() {
    console.log("in remove friends");
    Promise.resolve(this.onRemoveFriendsList()).then(
      this.setState({
        friendsList: await this.state.profile.methods.getFriends().call(),
      })
      // this.setState({
      //   ...this.state,
      //   friendsList: {
      //     ...this.state.friendsList,
      //     [address]: await profile.methods.getFriends().call(),
      //   },
      // })
    );
  }
  onRemoveFriendsList = async () => {
    // event.preventDefault();
    // console.log("in onRemoveFriendsList");
    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us friend's profile address
    const friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.state.friendsAddress
    );

    makeBatchRequest([
      // remove both of the exchanges in a batch request.
      this.state.profile.methods.removeAllFriends().send,
      friendsProfile.methods.removeAllFriends().send,
    ]);
    function makeBatchRequest(calls) {
      let batch = new web3.BatchRequest();

      console.log("in remove friends make batch " + accounts[0]);
      calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request(
            { from: accounts[0], gas: "1000000" },
            (err, data) => {
              if (err) rej(err);
              else res(data);
            }
          );
          batch.add(req);
        });
      });
      batch.execute();
    }
  };

  // *****************************************************
  //               BINARY_CONTRACT PART
  // *****************************************************

  // Add a debt request for both our exchanges and target exchanges
  onSubmitAddDebtRequest = async (event) => {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us friendsProfile address
    const friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.state.playerTwo
    );

    makeBatchRequest([
      // add both of the exchanges in a batch request.
      // the difference: addDebtRequest(destination, same other args), addDebtRequestNotRestricted(source, same other args)
      this.state.profile.methods.addDebtRequest(
        this.state.playerTwo,
        this.state.playerOne,
        this.state.providedAmount,
        this.state.playerTwo
      ).send,
      friendsProfile.methods.addDebtRequestNotRestricted(
        this.state.playerOne,
        this.state.playerOne,
        this.state.providedAmount,
        this.state.playerTwo
      ).send,
    ]);
    function makeBatchRequest(calls) {
      let batch = new web3.BatchRequest();

      // let promises = calls.map(call => {
      calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request(
            { from: accounts[0], gas: "1000000" },
            (err, data) => {
              if (err) rej(err);
              else res(data);
            }
          );
          batch.add(req);
        });
      });
      batch.execute();
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////

  // Confirm a debt request for both our exchanges and target exchanges
  onSubmitConfirmDebtRequest = async (event) => {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    // Setting this.state.{playerOne, Two, amount} from the request details:
    let myExchanges = await this.state.profile.methods.getAllExchanges().call();
    let choosenRequest = myExchanges[0]; // TODO: I use myExchanges[0] for testing only! The user will pick the correct one

    this.setState({ playerTwo: choosenRequest.transaction.from });
    this.setState({ playerOne: choosenRequest.transaction.to });
    this.setState({ providedAmount: choosenRequest.transaction.amount });

    let myContracts = await this.state.profile.methods.getContracts().call();

    let existedContractAddress; // if a contract will be deployed, we will use this variable. Otherwise, we will use deployedContractAddress
    let deployedContractAddress;
    let contractExisted = false;

    for (var i = 0; i < myContracts.length; i++) {
      // in this for loop we try to find if a contract exist, or we should create one
      let currentBinaryContract = await new web3.eth.Contract(
        JSON.parse(this.state.compiledBinaryContract.interface),
        (existedContractAddress = myContracts[i])
      );

      let currentDebtOfCurrentBinaryContract = await currentBinaryContract.methods
        .getCurrentDebt()
        .call();
      let accountsOfTransaction = [this.state.playerOne, this.state.playerTwo];

      if (
        accountsOfTransaction.includes(
          String(currentDebtOfCurrentBinaryContract.debtor)
        ) &&
        accountsOfTransaction.includes(
          String(currentDebtOfCurrentBinaryContract.creditor)
        )
      ) {
        // it means that the contract already exist

        await currentBinaryContract.methods
          .addTransaction(
            this.state.playerOne,
            this.state.providedAmount,
            this.state.playerTwo
          )
          .send({
            from: accounts[0],
            gas: "2000000",
          });

        contractExisted = true;

        break;
      }
    } // end of for loop - now we know if the contract existed or not

    if (!contractExisted) {
      // deploy a binaryContract
      await this.state.profile.methods
        .createBinaryContract(
          this.state.playerOne,
          this.state.providedAmount,
          this.state.playerTwo
        )
        .send({
          from: accounts[0],
          gas: "4000000",
        });

      console.log("Binary contract was created successfully!");

      deployedContractAddress = await this.state.profile.methods
        .getLastContract()
        .call();
    }

    let currentBinaryContractAddress = contractExisted
      ? existedContractAddress
      : deployedContractAddress;
    let currentBinaryContract = await new web3.eth.Contract(
      JSON.parse(this.state.compiledBinaryContract.interface),
      currentBinaryContractAddress
    );

    let friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.state.playerTwo
    );

    // we assign a zeroAddress if the contract already existed. Otherwise, the deployed contract address
    let newContractAddress = contractExisted
      ? await this.state.profile.methods.getZeroAddress().call()
      : deployedContractAddress;

    makeBatchRequest([
      // remove both of the exchanges in a batch request.

      // We call this method in order to remove our exchange on the profile (solidity)
      // TODO: when implementing it with the actual frontend, we should send the actual index instead of "0"
      this.state.profile.methods.confirmDebtRequest(0).send,

      // We call this method in order to remove friend's exchange (solidity method)
      // TODO: when implementing it with the actual frontend, we should send the actual index instead of "0"
      friendsProfile.methods.confirmDebtRequestNotRestricted(
        0,
        newContractAddress
      ).send,
    ]);
    function makeBatchRequest(calls) {
      let batch = new web3.BatchRequest();

      // let promises = calls.map(call => {
      calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request(
            { from: accounts[0], gas: "2000000" },
            (err, data) => {
              if (err) rej(err);
              else res(data);
            }
          );
          batch.add(req);
        });
      });
      batch.execute();
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////

  // Getting my exchanges
  onCheckMyExchanges = async () => {
    // console.log("your exchanges are:");
    if (
      (await this.state.profile.methods.getAllExchanges().call())[0] !==
      undefined
    ) {
      var exchange = {};
      Promise.resolve(
        (exchange = (
          await this.state.profile.methods.getAllExchanges().call()
        )[0].transaction)
      ).then(
        this.setState({
          exchanges: (
            await this.state.profile.methods.getAllExchanges().call()
          )[0].transaction,
        })
      );
    }

    if (
      (await this.state.profile.methods.getAllExchanges().call())[0] !==
      undefined
    ) {
      var exchange = {};
      Promise.resolve(
        (exchange = (
          await this.state.profile.methods.getAllExchanges().call()
        )[0].transaction)
      ).then(
        console.log(await this.state.profile.methods.getAllExchanges().call())
      );
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////

  // Getting my contracts
  onCheckMyContracts = async () => {
    this.setState({
      contractsList: await this.state.profile.methods.getContracts().call(),
    });
    var x = 0;
    for (x in this.state.contractsList) {
      let tempC = await new web3.eth.Contract(
        JSON.parse(this.state.compiledBinaryContract.interface),
        this.state.contractsList[x]
      );
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////

  // Remove Exchanges list for both our exchanges and friend exchanges
  onRemoveExchangesList = async (event) => {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us playerTwo's address
    const friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.state.playerTwo
    );

    makeBatchRequest([
      // remove both of the exchanges in a batch request.
      this.state.profile.methods.removeAllExchanges().send,
      friendsProfile.methods.removeAllExchanges().send,
    ]);
    function makeBatchRequest(calls) {
      let batch = new web3.BatchRequest();

      calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request(
            { from: accounts[0], gas: "2000000" },
            (err, data) => {
              if (err) rej(err);
              else res(data);
            }
          );
          batch.add(req);
        });
      });
      batch.execute();
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////
  // Remove Contracts list for both our contracts and friend contracts
  onRemoveContractsList = async (event) => {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us playerTwo's address
    const friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.state.playerTwo
    );

    makeBatchRequest([
      // remove both of the exchanges in a batch request.
      this.state.profile.methods.removeContracts().send,
      friendsProfile.methods.removeContracts().send,
    ]);
    function makeBatchRequest(calls) {
      let batch = new web3.BatchRequest();

      calls.map((call) => {
        return new Promise((res, rej) => {
          let req = call.request(
            { from: accounts[0], gas: "2000000" },
            (err, data) => {
              if (err) rej(err);
              else res(data);
            }
          );
          batch.add(req);
        });
      });
      batch.execute();
    }
  };

  // *****************************************************
  //                  FORM CHANGE HANDLERS
  // *****************************************************

  onChangeFormInput(event) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  }

  // *****************************************************
  //                       RENDER
  // *****************************************************

  render() {
    // console.log(this);
    return (
      <>
        <CRow>
          <CCol xs="12" md="8" xl="8">
            <AllContracts
              playerOne={this.state.address}
              address={this.state.address}
              playerTwo={this.state.playerTwo}
              profile={this.state.profile}
              compiledBinaryContract={this.props.compiledBinaryContract}
              myName={this.props.name}
            />
          </CCol>
        </CRow>
        {/* <CRow>
          <CCol xs="4" md="8" xl="8">
            <button
              onClick={() => {
                this.writeUserData("0547307181", "dror", this.props.playerOne);
              }}
            >
              add name
            </button>
          </CCol>
          <CCol xs="4" md="8" xl="8">
            <button
              onClick={() => {
                this.readUserData("0547307181");
              }}
            >
              find user
            </button>
          </CCol>
          <CCol xs="4" md="8" xl="8">
            <button
              onClick={() => {
                this.getAddressFromPhoneNumber("0547307181");
              }}
            >
              get address
            </button>
          </CCol>
        </CRow> */}
        {/* <CRow>
          <CCol xs="12" md="4">
            <AddFriend
              playerOne={this.state.address}
              address={this.state.address}
              playerTwo={this.state.playerTwo}
              profile={this.state.profile}
            />
          </CCol>
          <CCol xs="12" md="4">
            <CCard>
              <CForm
                action=""
                method="post"
                className="form-horizontal"
                onSubmit={this.onSubmitConfirmFriendRequest}
              >
                <CCardHeader>Confirm Friend</CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="12">
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="input2-group2"
                          name="input2-group2"
                          placeholder="Confirmation"
                          value={this.state.friendsAddress}
                          onChange={this.onChangeFormInput}
                        />
                      </CInputGroup>
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CButton type="submit" size="sm" color="success">
                    <CIcon name="cil-scrubber" /> Submit
                  </CButton>
                  <CButton type="reset" size="sm" color="danger">
                    <CIcon name="cil-ban" /> Reset
                  </CButton>
                </CCardFooter>
              </CForm>
            </CCard>
          </CCol>
        </CRow> */}
        {/* <CRow>
          <CCol xs="12" md="6" xl="6">
            <CCard>
              <CCardHeader>Friends List</CCardHeader>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-hover table-outline mb-0 ">
                    <thead className="thead-light">
                      <tr>
                        <th>Friends Address</th>
                        <th>Friends Name</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="button"
                  size="sm"
                  color="success"
                  onClick={this.onCheckMyFriends}
                >
                  <CIcon name="cil-user" /> Check Friends
                </CButton>
                <CButton
                  type="button"
                  size="sm"
                  color="danger"
                  onClick={this.updateRemovedFriends}
                >
                  <CIcon name="cil-user-unfollow" /> Remove Friends
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow> */}
        {/* <CRow>
          <CCol xs="12" sm="4">
            <AddDebt
              playerOne={this.state.playerOne}
              playerTwo={this.state.playerTwo}
              profile={this.state.profile}
            />
          </CCol>
          <CCol xs="12" sm="4">
            <CCard>
              <CCardHeader>Confirm Debt Request</CCardHeader>
              <CCardBody>
                <CForm
                  action=""
                  method="post"
                  onSubmit={this.onSubmitConfirmDebtRequest}
                >
                  <CFormGroup>
                    <CInputGroup>
                      <CInput
                        id="fromConfirm"
                        name="friendsAddress"
                        placeholder="from"
                        autoComplete="From"
                        value={this.state.friendsAddress}
                        onChange={this.onChangeFormInput}
                      />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CFormGroup>
                  <CFormGroup>
                    <CInputGroup>
                      <CInput
                        id="toConfirm"
                        name="playerOne"
                        placeholder="To"
                        autoComplete="to"
                        value={this.state.playerOne}
                        onChange={this.onChangeFormInput}
                      />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CFormGroup>
                  <CFormGroup>
                    <CInputGroup>
                      <CInput
                        id="amount"
                        name="providedAmount"
                        placeholder="Amount"
                        autoComplete="amount"
                        onChange={this.onChangeFormInput}
                      />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <CIcon name="cil-dollar" />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CFormGroup>
                  <CFormGroup className="form-actions">
                    <CButton type="submit" size="sm" color="secondary">
                      Confirm a Debt Request
                    </CButton>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow> */}
        {/* <CRow>
          <CCol xs="12" md="4" xl="4">
            <CCard>
              <CCardHeader>Contracts</CCardHeader>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-hover table-outline mb-0 ">
                    <thead className="thead-light">
                      <tr>
                        <th>Contract address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.contractsList.map((contract) => (
                        <tr key={contract}>
                          <td>
                            <div>{contract}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="button"
                  size="sm"
                  color="success"
                  onClick={this.onCheckMyContracts}
                >
                  <CIcon name="cil-user" /> Check Contracts
                </CButton>
                <CButton
                  type="button"
                  size="sm"
                  color="danger"
                  onClick={this.onRemoveContractsList}
                >
                  <CIcon name="cil-user-unfollow" /> Remove Contracts
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
          <CCol xs="12" md="8" xl="8">
            <CCard>
              <CCardHeader>Exchanges</CCardHeader>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-hover table-outline mb-0 ">
                    <thead className="thead-light">
                      <tr>
                        <th>from Address</th>
                        <th>to Address</th>
                        <th>amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.exchanges === undefined ? (
                        <p>loading..</p>
                      ) : (
                        <tr key={this.state.exchanges.date}>
                          <td>
                            <div>{this.state.exchanges.from}</div>
                          </td>
                          <td>
                            <div>{this.state.exchanges.to}</div>
                          </td>
                          <td>
                            <div>{this.state.exchanges.amount}</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="button"
                  size="sm"
                  color="success"
                  onClick={this.onCheckMyExchanges}
                >
                  <CIcon name="cil-user" /> Check Exchanges
                </CButton>
                <CButton
                  type="button"
                  size="sm"
                  color="danger"
                  onClick={this.onRemoveExchangesList}
                >
                  <CIcon name="cil-user-unfollow" /> Remove Exchanges
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow> */}
      </>
    );
  }
}

export default Dashboard;
