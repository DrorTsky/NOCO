import React, { Component } from "react";
import web3 from "../../web3.js";
import profileAbi from "../../profile";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";

import Brightness1TwoToneIcon from "@material-ui/icons/Brightness1TwoTone";

var debtRequestType = {
  debtRequest: "0",
  debtRotationRequest: "1",
};

var debtRotationStatus = {
  MediatorAgreed: "0",
  CreditorAgreed: "1",
  DebtorAgreed: "2",
  Done: "3",
};

export class RotationRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMediator: false,
      isDebtor: false,
      isCreditor: false,
      statusToSend: "0",
      addressToGetIndexFrom: "",
      mediatorName: "",
      creditorName: "",
      debtorName: "",
    };
    this.findParticipantsExchangeIndex = this.findParticipantsExchangeIndex.bind(
      this
    );
    this.confirmRotationRequest = this.confirmRotationRequest.bind(this);
    this.sendRotationRequestSingle = this.sendRotationRequestSingle.bind(this);
    this.mediatorsFinalAccept = this.mediatorsFinalAccept.bind(this);
    this.checkIfContractExists = this.checkIfContractExists.bind(this);
    this.declineRotationRequest = this.declineRotationRequest.bind(this);
    this.setNames = this.setNames.bind(this);
  }

  async componentDidMount() {
    if (this.props.playerOne === this.props.exchange.debtRotation.mediator) {
      this.setState({ isMediator: true });
    } else if (
      this.props.playerOne === this.props.exchange.debtRotation.creditor
    ) {
      this.setState({
        isCreditor: true,
        statusToSend: debtRotationStatus.CreditorAgreed,
        addressToGetIndexFrom: this.props.exchange.debtRotation.debtor,
      });
    } else {
      this.setState({
        isDebtor: true,
        statusToSend: debtRotationStatus.DebtorAgreed,
        addressToGetIndexFrom: this.props.exchange.debtRotation.creditor,
      });
    }
    await this.setNames();
  }
  setNames = async () => {
    let mediatorProfile = new web3.eth.Contract(
      profileAbi,
      this.props.exchange.debtRotation.mediator
    );
    let creditorProfile = new web3.eth.Contract(
      profileAbi,
      this.props.exchange.debtRotation.creditor
    );
    let debtorProfile = new web3.eth.Contract(
      profileAbi,
      this.props.exchange.debtRotation.debtor
    );
    this.setState({
      mediatorName: await mediatorProfile.methods.getName().call(),
      creditorName: await creditorProfile.methods.getName().call(),
      debtorName: await debtorProfile.methods.getName().call(),
    });
  };

  //********************************************************
  // MEDIATORS ACCEPT
  //********************************************************
  checkIfContractExists = async (profile, debtorsAddress, creditorsAddress) => {
    // console.log(
    //   `debtors address: ${debtorsAddress}, creditors address: ${creditorsAddress}`
    // );
    // console.log(profile);
    let contracts = await profile.methods.getContracts().call();
    // console.log(`contract length: ${contracts.length}`);
    // console.log(contracts);
    for (var index = 0; index < contracts.length; index++) {
      let contract = await profile.methods.getContractsByIndex(index).call();
      // console.log(`contract address: ${contract}`);
      let tempC = await new web3.eth.Contract(
        JSON.parse(this.props.compiledBinaryContract.interface),
        contract
      );
      let creditorName = await tempC.methods.getCurrentCreditorAddress().call();
      // console.log(`creditors name: ${creditorName}`);
      let debtorName = await tempC.methods.getCurrentDebtorAddress().call();
      // console.log(`debtors name: ${debtorName}`);
      if (
        creditorName === debtorsAddress ||
        creditorName === creditorsAddress
      ) {
        if (debtorName === debtorsAddress || debtorName === creditorsAddress) {
          // console.log(`found contract: ${tempC}`);
          return tempC;
        }
      }
      // console.log(`creditor: ${creditorName}, debtor:${debtorName}`);
    }
    // console.log("false");
    return undefined;
  };
  mediatorsFinalAccept = async () => {
    let accounts = await web3.eth.getAccounts();
    // get profiles
    const debtorsProfile = new web3.eth.Contract(
      profileAbi,
      this.props.exchange.debtRotation.debtor
    );
    // console.log(`debtorsProfile: ${debtorsProfile}`);
    const creditorsProfile = new web3.eth.Contract(
      profileAbi,
      this.props.exchange.debtRotation.creditor
    );
    // console.log(`debtorsProfile: ${creditorsProfile}`);
    // get indexes
    let debtorsIndex = await this.findParticipantsExchangeIndex(
      this.props.exchange.debtRotation.debtor
    );
    // console.log(`debtors index: ${debtorsIndex}`);
    let creditorsIndex = await this.findParticipantsExchangeIndex(
      this.props.exchange.debtRotation.creditor
    );
    // console.log(`creditors index: ${creditorsIndex}`);
    // check if debtor has a binary contract with creditor
    let isContract = await this.checkIfContractExists(
      creditorsProfile,
      this.props.exchange.debtRotation.debtor,
      this.props.exchange.debtRotation.creditor
    );
    // if not, create one
    if (isContract === undefined) {
      // console.log(`no contract, creating one`);
      // deploy a binaryContract
      await creditorsProfile.methods
        .createBinaryContract(
          this.props.exchange.debtRotation.debtor,
          this.props.exchange.debtRotation.amount,
          this.props.exchange.debtRotation.creditor
        )
        .send({
          from: accounts[0],
          gas: "4000000",
        });
      isContract = await this.checkIfContractExists(
        creditorsProfile,
        this.props.exchange.debtRotation.debtor,
        this.props.exchange.debtRotation.creditor
      );
      // console.log(`created a contract: ${isContract}`);
    } else {
      //transfer debt between creditor and debtor
      // console.log(`contract already exists: ${isContract}`);
      await isContract.methods
        .addTransaction(
          this.props.exchange.debtRotation.debtor,
          this.props.exchange.debtRotation.amount,
          this.props.exchange.debtRotation.creditor
        )
        .send({
          from: accounts[0],
          gas: "2000000",
        });
      // console.log(`transaction added`);
    }
    //transfer debt between debtor and mediator - debtor transfers to mediator "closing" the debt
    let debtorMediatorContract = await this.checkIfContractExists(
      debtorsProfile,
      this.props.exchange.debtRotation.mediator,
      this.props.exchange.debtRotation.debtor
    );
    // console.log(`mediator - debtor contract: ${debtorMediatorContract}`);
    await debtorMediatorContract.methods
      .addTransaction(
        this.props.exchange.debtRotation.mediator,
        this.props.exchange.debtRotation.amount,
        this.props.exchange.debtRotation.debtor
      )
      .send({
        from: accounts[0],
        gas: "2000000",
      });
    // console.log(`mediator - debtor contract: transferred`);

    // transfer debt between mediator and creditor
    let mediatorCreditorContract = await this.checkIfContractExists(
      this.props.profile,
      this.props.exchange.debtRotation.creditor,
      this.props.exchange.debtRotation.mediator
    );
    // console.log(`mediator - creditor contract: ${mediatorCreditorContract}`);
    await mediatorCreditorContract.methods
      .addTransaction(
        this.props.exchange.debtRotation.mediator,
        this.props.exchange.debtRotation.amount,
        this.props.exchange.debtRotation.creditor
      )
      .send({
        from: accounts[0],
        gas: "2000000",
      });
    // console.log(`mediator - creditor contract: transferred`);
    // console.log(isContract._address);
    //remove rotation exchanges
    await this.props.profile.methods
      .confirmDebtRotationRequest(this.props.index)
      .send({
        from: accounts[0],
        gas: "2000000",
      });
    await debtorsProfile.methods
      .confirmDebtRotationRequestNotRestricted(
        debtorsIndex,
        isContract._address
      )
      .send({
        from: accounts[0],
        gas: "2000000",
      });
    await creditorsProfile.methods
      .confirmDebtRotationRequestNotRestricted(
        creditorsIndex,
        isContract._address
      )
      .send({
        from: accounts[0],
        gas: "2000000",
      });
  };
  //********************************************************
  // ROTATION NON MEDIATOR PARTICIPANTS
  //********************************************************

  // FIND EXCHANGE INDEX
  findParticipantsExchangeIndex = async (address) => {
    const profile = new web3.eth.Contract(profileAbi, address);
    const addresses = await profile.methods.getAllExchanges().call();
    // console.log(addresses.length);
    for (var index = 0; index < addresses.length; index++) {
      let exchange = await profile.methods.getAllExchangesByIndex(index).call();
      if (
        this.props.exchange.debtRotation.debtor ===
          exchange.debtRotation.debtor &&
        this.props.exchange.debtRotation.creditor ===
          exchange.debtRotation.creditor &&
        this.props.exchange.debtRotation.mediator ===
          exchange.debtRotation.mediator &&
        this.props.exchange.debtRotation.amount === exchange.debtRotation.amount
      ) {
        // console.log(`succeeded finding index: ${index}`);
        return index;
      }
    }
  };
  //  SEND A ROTATION EXCHANGE
  sendRotationRequestSingle = async (profile, index, accounts) => {
    // console.log(`inside sendRotationRequestSingle`);
    await profile.methods
      .addDebtRotationRequestNotRestricted(
        this.props.exchange.debtRotation.mediator,
        this.props.exchange.debtRotation.creditor,
        this.props.exchange.debtRotation.debtor,
        this.props.exchange.debtRotation.amount,
        this.state.statusToSend,
        index
      )
      .send({ from: accounts[0], gas: "3000000" });
  };
  // CONFIRM REQUEST
  confirmRotationRequest = async () => {
    let accounts = await web3.eth.getAccounts();
    const mediatorsProfile = new web3.eth.Contract(
      profileAbi,
      this.props.exchange.debtRotation.mediator
    );
    const otherProfile = new web3.eth.Contract(
      profileAbi,
      this.state.addressToGetIndexFrom
    );

    let mediatorsIndex = await this.findParticipantsExchangeIndex(
      this.props.exchange.debtRotation.mediator
    );
    // console.log(`mediators index: ${mediatorsIndex}`);
    let otherParticipantsIndex = await this.findParticipantsExchangeIndex(
      this.state.addressToGetIndexFrom
    );
    // console.log(`other index: ${otherParticipantsIndex}`);

    // console.log(
    //   `profile: ${this.props.profile}, index: ${this.props.index}, accounts: ${accounts}`
    // );
    await this.sendRotationRequestSingle(
      this.props.profile,
      this.props.index,
      accounts
    ); //this profile
    await this.sendRotationRequestSingle(
      mediatorsProfile,
      mediatorsIndex,
      accounts
    ); //mediators profile, mediator is not going through this process
    await this.sendRotationRequestSingle(
      otherProfile,
      otherParticipantsIndex,
      accounts
    ); //third and final participant
  };

  declineRotationRequest = async (event) => {
    event.preventDefault();
    console.log("in decline");
    //getting users account
    const accounts = await web3.eth.getAccounts();

    const addresses = [
      this.props.exchange.debtRotation.creditor,
      this.props.exchange.debtRotation.debtor,
      this.props.exchange.debtRotation.mediator,
    ];
    console.log(addresses);

    let forBatchRequests = [];
    addresses.map(async (address) => {
      console.log(address);
      if (address !== this.props.playerOne) {
        let friendsProfile = new web3.eth.Contract(profileAbi, address);
        let friendsExchangeIndex = -1;
        let friendsExchanges = await friendsProfile.methods
          .getAllExchanges()
          .call();
        let length = friendsExchanges.length;
        if (length > 0) {
          for (var friendsIndex = 0; friendsIndex < length; friendsIndex++) {
            let exchange = await friendsProfile.methods
              .getAllExchangesByIndex(friendsIndex)
              .call();
            if (
              exchange.exchangePurpose ===
                this.props.exchange.exchangePurpose &&
              exchange.transaction.date === this.props.exchange.transaction.date
            ) {
              friendsExchangeIndex = friendsIndex;
            }
          }
        }
        forBatchRequests.push(
          friendsProfile.methods.removeExchange(friendsExchangeIndex).send
        );
      }
      forBatchRequests.push(
        this.props.profile.methods.removeExchange(this.props.index).send
      );

      // BATCH
      // if (friendsExchangeIndex !== -1) {
      makeBatchRequest(forBatchRequests);
      // }
      function makeBatchRequest(calls) {
        let batch = new web3.BatchRequest();

        calls.map((call) => {
          return new Promise((res, rej) => {
            let req = call.request(
              { from: accounts[0], gas: "3000000" },
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
    });
    // for (let address in addresses) {

    // }
  };

  render() {
    console.log(this);
    const headerMessage = this.state.isMediator
      ? "You requested a rotation with:"
      : `${this.state.mediatorName} requested a rotation`;
    //********************************************************
    //PROGRESS STATUS
    //********************************************************
    const progress = [];
    let iconsAmount =
      this.props.exchange.debtRotation.status === "2"
        ? "1"
        : this.props.exchange.debtRotation.status;
    for (let index = 0; index <= 2; index++) {
      if (index <= parseInt(iconsAmount)) {
        progress.push(
          <CCol key={index} xs="4">
            <Brightness1TwoToneIcon
              key={index}
              fontSize="large"
              style={{ color: "green" }}
            />
          </CCol>
        );
      } else {
        progress.push(
          <CCol key={index} xs="4">
            <Brightness1TwoToneIcon
              key={index}
              fontSize="large"
              color="action"
            />
          </CCol>
        );
      }
    }
    //********************************************************
    //BUTTONS
    //********************************************************
    const buttons = [];
    if (
      this.state.isMediator &&
      this.props.exchange.debtRotation.status === debtRotationStatus.Done
    ) {
      buttons.push(
        <CButton
          key="confirm"
          size="sm"
          color="secondary"
          className="buttons_inside_contract_list"
          onClick={this.mediatorsFinalAccept}
        >
          confirm
        </CButton>
      );
    }
    if (this.props.exchange.debtRotation.status !== debtRotationStatus.Done) {
      if (
        (this.state.isDebtor &&
          this.props.exchange.debtRotation.status !==
            debtRotationStatus.DebtorAgreed) ||
        (this.state.isCreditor &&
          this.props.exchange.debtRotation.status !==
            debtRotationStatus.CreditorAgreed)
      ) {
        buttons.push(
          <div>
            <CButton
              key="confirm"
              size="sm"
              color="secondary"
              className="buttons_inside_contract_list"
              onClick={this.confirmRotationRequest}
            >
              confirm
            </CButton>
            <CButton
              key="refuse"
              size="sm"
              color="dark"
              className="buttons_inside_contract_list"
              onClick={this.declineRotationRequest}
            >
              refuse
            </CButton>
          </div>
        );
      }
    }
    return (
      <div>
        <CCard color="info" className="text-white text-center">
          <CCardHeader>{headerMessage}</CCardHeader>
          <CCardBody>
            <blockquote className="card-bodyquote">
              <h6>
                {this.state.creditorName} and {this.state.debtorName}
              </h6>
              <br />
              <h3>for: {this.props.exchange.debtRotation.amount}</h3>
              {this.props.creationDate}
            </blockquote>
            <CCard style={{ marginBottom: "10px", height: "50px" }}>
              <CCardBody style={{ padding: "8px" }}>
                <CRow>{progress}</CRow>
              </CCardBody>
            </CCard>
            <footer className="footer_contract_list_element">{buttons}</footer>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default RotationRequest;
