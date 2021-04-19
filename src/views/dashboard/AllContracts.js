import React, { Component } from "react";
import Contract from "./Contract";

import web3 from "../../web3.js";

export class AllContracts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractsList: [],
      allContracts: [],
      listInformation: {},
    };
    this.onCheckMyContracts = this.onCheckMyContracts.bind(this);
  }

  //////////////////////////////////////////////////////////////////////////////////////

  // Getting my contracts
  onCheckMyContracts = async () => {
    this.setState({
      contractsList: await this.props.profile.methods.getContracts().call(),
    });
    const length = this.state.contractsList.length;

    if (length > 0) {
      for (var index = 0; index < length; index++) {
        this.setState({
          allContracts: [
            ...this.state.allContracts,
            await this.props.profile.methods.getContractsByIndex(index).call(),
          ],
        });
      }
    }
    var x = 0;
    for (x in this.state.contractsList) {
      let tempC = await new web3.eth.Contract(
        JSON.parse(this.props.compiledBinaryContract.interface),
        this.state.contractsList[x]
      );
      let creditorName = await tempC.methods.getCurrentCreditorAddress().call();
      let debtorName = await tempC.methods.getCurrentDebtorAddress().call();
      let debtAmount = await tempC.methods.getCurrentDebtAmount().call();
      let allTransactions = await tempC.methods.getAllTransations().call();
      // console.log(allTransactions);
      let typeOfCard =
        creditorName === this.props.playerOne ? "danger" : "success";
      let binaryContractInstance = {
        allTransactions: allTransactions,
        typeOfCard: typeOfCard,
        creditor: creditorName,
        debtor: debtorName,
        debt: debtAmount,
      };
      let newListInformation = {
        ...this.state.listInformation,
        [x]: binaryContractInstance,
      };
      this.setState({
        listInformation: newListInformation,
      });
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////

  async componentDidMount() {
    // console.log(this.state.friendsList);
    let ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      await ethereum.enable();
    }
    // this.onCheckMyExchanges();
    this.onCheckMyContracts();
    // this.onCheckMyFriends();
  }

  render() {
    // console.log(this);
    const items = [];
    for (const [index, value] of Object.entries(this.state.listInformation)) {
      items.push(
        <Contract
          key={index}
          myAddress={this.props.playerOne}
          {...this.props}
          {...value}
        />
      );
    }

    const isContractListEmpty = this.state.contractsList.length;

    return (
      <div>
        {/* {items} */}
        {isContractListEmpty === 0 ? <h1>no active contracts</h1> : items}
      </div>
    );
  }
}

export default AllContracts;
