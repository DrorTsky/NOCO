import React, { Component } from "react";
import web3 from "../../web3.js";
import profileAbi from "../../profile";

//CORE-UI
import { CButton, CCard, CCardBody, CCardHeader, CLink } from "@coreui/react";
import CIcon from "@coreui/icons-react";

//MATERIAL-UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddIcon from "@material-ui/icons/Add";

import TransactionLog from "./TransactionLog";
import AddDebt from "../forms/AddDebt";

export class Contract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTransactions: props.allTransactions,
      myName: props.myName,
      typeOfCard: props.typeOfCard,
      creditor: props.creditor,
      debtor: props.debtor,
      debt: props.debt,
      openTransactionLog: false,
      openAddDebt: false,
      friendsName: "",
      friendsAddress: "",
    };

    this.handleOpenTransactionLog = this.handleOpenTransactionLog.bind(this);
    this.handleCloseTransactionLog = this.handleCloseTransactionLog.bind(this);
    this.handleOpenAddDebt = this.handleOpenAddDebt.bind(this);
    this.handleCloseAddDebt = this.handleCloseAddDebt.bind(this);
    this.getNameFromAddress = this.getNameFromAddress.bind(this);
  }

  componentDidMount() {
    this.getNameFromAddress();
    // console.log(this.props.allTransactions);
  }

  handleOpenTransactionLog = () => {
    this.setState({
      openTransactionLog: true,
    });
  };
  handleCloseTransactionLog = () => {
    this.setState({
      openTransactionLog: false,
    });
  };

  handleOpenAddDebt = () => {
    this.setState({
      openAddDebt: true,
    });
  };
  handleCloseAddDebt = () => {
    this.setState({
      openAddDebt: false,
    });
  };

  getNameFromAddress = async () => {
    const friendsAddress =
      this.props.debtor === this.props.playerOne
        ? this.props.creditor
        : this.props.debtor;
    this.setState({ friendsAddress: friendsAddress });
    let friendsProfile = new web3.eth.Contract(profileAbi, friendsAddress);
    this.setState({
      friendsName: await friendsProfile.methods.getName().call(),
    });
  };

  render() {
    // console.log(this);
    let headerName =
      this.state.myName === this.state.creditor
        ? this.props.myName
        : this.state.friendsName;
    let message = "";
    let cardTextStyle = "";
    if (this.state.typeOfCard === "danger") {
      cardTextStyle = "text-center red_text";
      message = (
        <CCardHeader>
          <b>you owe</b> {headerName}
        </CCardHeader>
      );
    } else {
      cardTextStyle = "text-center green_text";
      message = (
        <CCardHeader>
          {headerName}
          <br /> <b>owes you</b>
        </CCardHeader>
      );
    }

    return (
      <div>
        <CCard className={cardTextStyle}>
          {message}
          <CCardBody>
            <blockquote className="card-bodyquote">
              <h1>{this.state.debt}</h1>
            </blockquote>
            <footer className="footer_contract_list_element">
              <CButton
                size="sm"
                color="dark"
                className="buttons_inside_contract_list"
                onClick={this.handleOpenTransactionLog}
              >
                <CIcon name="cil-scrubber" /> Transactions
              </CButton>
              <Dialog
                open={this.state.openTransactionLog}
                onClose={this.handleCloseTransactionLog}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title" className="align_center">
                  All transactions
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={this.handleCloseTransactionLog}
                    >
                      <CIcon name="cil-x-circle" />
                    </CLink>
                  </div>
                </DialogTitle>
                <DialogContent>
                  <TransactionLog
                    myName={this.state.myName}
                    myAddress={this.props.address}
                    allTransactions={this.state.allTransactions}
                    friendsName={this.state.friendsName}
                  />
                </DialogContent>
              </Dialog>

              <CButton
                size="sm"
                color="secondary"
                className="buttons_inside_contract_list"
                onClick={this.handleOpenAddDebt}
              >
                {/* <CIcon name="cil-note-add" /> */}
                <AddIcon fontSize="small"></AddIcon>
                Add Debt
              </CButton>
              <Dialog
                open={this.state.openAddDebt}
                onClose={this.handleCloseAddDebt}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Sum you gave</DialogTitle>
                <DialogContent>
                  <AddDebt
                    {...this.props}
                    friendAddress={this.state.friendsAddress}
                    handleClose={this.handleCloseAddDebt}
                  />
                </DialogContent>
              </Dialog>
            </footer>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default Contract;
