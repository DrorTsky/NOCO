import React, { Component } from "react";
// import fireApp from "firebase/app";

import AllContracts from "./AllContracts";
// TEST RELATED
import web3 from "../../web3.js";

import { CCol, CRow } from "@coreui/react";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractsList: [],
    };

    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.onCheckMyContracts = this.onCheckMyContracts.bind(this);
  }

  async componentDidMount() {
    // console.log(this.state.friendsList);
    let ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      await ethereum.enable();
    }
    this.onCheckMyContracts();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  // Getting my contracts
  onCheckMyContracts = async () => {
    this.setState({
      contractsList: await this.props.profile.methods.getContracts().call(),
    });
    var x = 0;
    for (x in this.state.contractsList) {
      let tempC = await new web3.eth.Contract(
        JSON.parse(this.props.compiledBinaryContract.interface),
        this.state.contractsList[x]
      );
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////

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
              playerOne={this.props.address}
              address={this.props.address}
              playerTwo={this.props.playerTwo}
              profile={this.props.profile}
              compiledBinaryContract={this.props.compiledBinaryContract}
              myName={this.props.name}
              setStateAndAmountOfExchanges={
                this.props.setStateAndAmountOfExchanges
              }
            />
          </CCol>
        </CRow>
      </>
    );
  }
}

export default Dashboard;
