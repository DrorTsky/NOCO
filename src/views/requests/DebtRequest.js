import React, { Component } from "react";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import web3 from "../../web3.js";
import profileAbi from "../../profile";

export class DebtRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendsName: "",
    };
    this.confirmDebtRequest = this.confirmDebtRequest.bind(this);
    this.declineDebtRequest = this.declineDebtRequest.bind(this);
    this.findParticipantsExchangeIndex = this.findParticipantsExchangeIndex.bind(
      this
    );
    this.getNameFromAddress = this.getNameFromAddress.bind(this);
  }

  componentDidMount() {
    this.getNameFromAddress();
  }
  // FIND EXCHANGE INDEX
  findParticipantsExchangeIndex = async (address) => {
    const profile = new web3.eth.Contract(profileAbi, address);
    const addresses = await profile.methods.getAllExchanges().call();
    // console.log(addresses.length);
    for (var index = 0; index < addresses.length; index++) {
      let exchange = await profile.methods.getAllExchangesByIndex(index).call();
      if (
        this.props.exchange.transaction.from === exchange.transaction.from &&
        this.props.exchange.transaction.to === exchange.transaction.to &&
        this.props.exchange.transaction.amount === exchange.transaction.amount
      ) {
        // console.log(`succeeded finding index: ${index}`);
        return index;
      }
    }
  };

  confirmDebtRequest = async (event) => {
    event.preventDefault();

    // Getting accounts list
    const accounts = await web3.eth.getAccounts();

    let myContracts = await this.props.profile.methods.getContracts().call();

    let existedContractAddress; // if a contract will be deployed, we will use this variable. Otherwise, we will use deployedContractAddress
    let deployedContractAddress;
    let contractExisted = false;

    for (var i = 0; i < myContracts.length; i++) {
      // in this for loop we try to find if a contract exist, or we should create one
      let contract = await this.props.profile.methods
        .getContractsByIndex(this.props.index)
        .call();
      let currentBinaryContract = await new web3.eth.Contract(
        JSON.parse(this.props.compiledBinaryContract.interface),
        contract
      );
      let currentDebtOfCurrentBinaryContract = await currentBinaryContract.methods
        .getCurrentDebt()
        .call();

      let accountsOfTransaction = [this.props.destination, this.props.source];

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
            this.props.destination,
            this.props.amount,
            this.props.source
          )
          .send({
            from: accounts[0],
            gas: "2000000",
          });

        contractExisted = true;
        console.log("contract exists");

        break;
      }
    } // end of for loop - now we know if the contract existed or not

    if (!contractExisted) {
      console.log("creating contract");
      // deploy a binaryContract
      await this.props.profile.methods
        .createBinaryContract(
          this.props.destination,
          this.props.amount,
          this.props.source
        )
        .send({
          from: accounts[0],
          gas: "4000000",
        });

      console.log("Binary contract was created successfully!");

      deployedContractAddress = await this.props.profile.methods
        .getLastContract()
        .call();
    }

    const friendsAddress =
      this.props.exchange.transaction.from === this.props.playerOne
        ? this.props.exchange.transaction.to
        : this.props.exchange.transaction.from;
    let friendsProfile = new web3.eth.Contract(profileAbi, friendsAddress);
    var friendsExchangeIndex = await this.findParticipantsExchangeIndex(
      friendsAddress
    );
    console.log(
      `friendsAddress: ${friendsAddress},friendsExchangeIndex: ${friendsExchangeIndex} `
    );
    // we assign a zeroAddress if the contract already existed. Otherwise, the deployed contract address
    let newContractAddress = contractExisted
      ? await this.props.profile.methods.getZeroAddress().call()
      : deployedContractAddress;

    makeBatchRequest([
      // remove both of the exchanges in a batch request.

      // We call this method in order to remove our exchange on the profile (solidity)
      // TODO: when implementing it with the actual frontend, we should send the actual index instead of "0"
      this.props.profile.methods.confirmDebtRequest(this.props.index).send,

      // We call this method in order to remove friend's exchange (solidity method)
      // TODO: when implementing it with the actual frontend, we should send the actual index instead of "0"
      friendsProfile.methods.confirmDebtRequestNotRestricted(
        friendsExchangeIndex,
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

  getNameFromAddress = async () => {
    const friendsAddress =
      this.props.exchange.transaction.from === this.props.playerOne
        ? this.props.exchange.transaction.to
        : this.props.exchange.transaction.from;
    let friendsProfile = new web3.eth.Contract(profileAbi, friendsAddress);
    this.setState({
      friendsName: await friendsProfile.methods.getName().call(),
    });
  };

  declineDebtRequest = async (event) => {
    event.preventDefault();

    //getting users account
    const accounts = await web3.eth.getAccounts();

    //testing which address is not the user
    const friendsAddress =
      this.props.exchange.transaction.from === this.props.playerOne
        ? this.props.exchange.transaction.to
        : this.props.exchange.transaction.from;
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
        }
      }

      // BATCH
      // if (friendsExchangeIndex !== -1) {
      makeBatchRequest([
        // remove both of the exchanges in a batch request.
        friendsProfile.methods.removeExchange(friendsExchangeIndex).send,
        this.props.profile.methods.removeExchange(this.props.index).send,
      ]);
      // }
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
    }
  };

  render() {
    console.log(this);
    let bodyMessage = "";
    let topMessage = "";
    const buttons = [];
    if (this.props.playerOne === this.props.source) {
      topMessage = "pending...";
      bodyMessage =
        "you sent " + this.state.friendsName + " " + this.props.amount;
      buttons.push(
        <div>
          <CButton
            size="sm"
            color="dark"
            className="buttons_inside_contract_list"
            onClick={this.declineDebtRequest}
          >
            cancel request
          </CButton>
        </div>
      );
    } else {
      topMessage = "from: " + this.state.friendsName;
      bodyMessage = this.state.friendsName + " payed you: " + this.props.amount;
      buttons.push(
        <div>
          <CButton
            size="sm"
            color="secondary"
            className="buttons_inside_contract_list"
            onClick={this.confirmDebtRequest}
          >
            accept
          </CButton>
          <CButton
            size="sm"
            color="dark"
            className="buttons_inside_contract_list"
            onClick={this.declineDebtRequest}
          >
            refuse
          </CButton>
        </div>
      );
    }
    return (
      <div>
        <CCard color="info" className="text-white text-center">
          <CCardHeader>{topMessage}</CCardHeader>
          <CCardBody>
            <blockquote className="card-bodyquote">
              <h3>
                {bodyMessage} <br />
              </h3>
              {this.props.creationDate}
            </blockquote>

            <footer className="footer_contract_list_element">
              {/* <CButton
                size="sm"
                color="secondary"
                className="buttons_inside_contract_list"
                onClick={this.confirmDebtRequest}
              >
                accept
              </CButton>
              <CButton
                size="sm"
                color="dark"
                className="buttons_inside_contract_list"
                onClick={this.declineDebtRequest}
              >
                refuse
              </CButton> */}
              {buttons}
            </footer>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default DebtRequest;
