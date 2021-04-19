import React, { Component } from "react";
import web3 from "../../web3.js";
import profileAbi from "../../profile";
//CORE-UI
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CCardFooter,
  CButton,
} from "@coreui/react";

//MATERIAL-UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import AmountToRotateRotationDialog from "./AmountToRotateRotationDialog.js";

// since in order to have contract you need you have the other participant
// as a friend first, plus you cannot rotate "0" debt, I'm creating the list from
// the active contracts

export class ChooseFriendsForRotationRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractsList: [],
      allContracts: [],
      listInformation: {},
      peopleUserOwesTo: {},
      peopleOweToUser: {},
      selectedDebtor: "",
      selectedCreditor: "",
      isDebtorSelected: false,
      isCreditorSelected: false,
      openRotationSelectAmount: false,
      amountToRotate: 0,
    };
    // this.onCheckMyContracts = this.onCheckMyContracts.bind(this);
    this.debtorSelected = this.debtorSelected.bind(this);
    this.creditorSelected = this.creditorSelected.bind(this);
    this.handleOpenRotationSelectAmount = this.handleOpenRotationSelectAmount.bind(
      this
    );
    this.handleCloseRotationSelectAmount = this.handleCloseRotationSelectAmount.bind(
      this
    );
    // this.onCheckMyContracts = this.onCheckMyContracts.bind(this);
    this.getNameFromAddress = this.getNameFromAddress.bind(this);
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

      // get necessary information from the Contract
      let creditorAddress = await tempC.methods
        .getCurrentCreditorAddress()
        .call();
      let debtorAddress = await tempC.methods.getCurrentDebtorAddress().call();
      let debtAmount = await tempC.methods.getCurrentDebtAmount().call();

      // asses who owes who for future filtering
      let friendsAddress;
      let friendsName;
      let isInDebt;
      if (creditorAddress !== this.props.playerOne) {
        friendsAddress = creditorAddress;
        isInDebt = "success";
        //TODO get friends name from server
      } else {
        friendsAddress = debtorAddress;
        isInDebt = "danger";
        //TODO get friends name from server
      }

      // create list of contract information
      let name = await this.getNameFromAddress(friendsAddress);
      let binaryContractInstance = {
        friendsAddress: friendsAddress,
        debt: debtAmount,
        isInDebt: isInDebt,
        name: name,
      };
      if (binaryContractInstance.isInDebt === "danger") {
        let newListInformation = {
          ...this.state.peopleUserOwesTo,
          [x]: binaryContractInstance,
        };

        this.setState({
          peopleUserOwesTo: newListInformation,
        });
      } else {
        let newListInformation = {
          ...this.state.peopleOweToUser,
          [x]: binaryContractInstance,
        };

        this.setState({
          peopleOweToUser: newListInformation,
        });
      }
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////

  getNameFromAddress = async (friendsAddress) => {
    let friendsProfile = new web3.eth.Contract(profileAbi, friendsAddress);
    return await friendsProfile.methods.getName().call();
  };

  async componentDidMount() {
    // console.log(this.state.friendsList);
    let ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      await ethereum.enable();
    }
    this.onCheckMyContracts();
  }

  debtorSelected = (selectedDebtor) => (ev) => {
    this.setState({ selectedDebtor });
    this.setState((prevState) => {
      return { isDebtorSelected: true };
    });
  };
  creditorSelected = (selectedCreditor) => (ev) => {
    this.setState({ selectedCreditor });
    this.setState((prevState) => {
      return { isCreditorSelected: true };
    });
  };

  handleOpenRotationSelectAmount = () => {
    this.setState({ openRotationSelectAmount: true });
  };
  handleCloseRotationSelectAmount = () => {
    this.setState({ openRotationSelectAmount: false });
  };

  render() {
    // console.log(this);

    const peopleOweToUser = [];
    const peopleUserOwesTo = [];

    for (const [index, value] of Object.entries(this.state.peopleOweToUser)) {
      // console.log(this.state.peopleOweToUser);
      peopleOweToUser.push(
        <CListGroupItem
          accent="success"
          color="success"
          key={index}
          className={
            index === this.state.selectedDebtor
              ? "selected group_item_padding"
              : "group_item_padding"
          }
          style={{ borderTopWidth: "2px" }}
          onClick={this.debtorSelected(index)}
        >
          {value.name}:<br /> <b>{value.debt}</b>
        </CListGroupItem>
      );
    }
    for (const [index, value] of Object.entries(this.state.peopleUserOwesTo)) {
      peopleUserOwesTo.push(
        <CListGroupItem
          accent="danger"
          color="danger"
          key={index}
          className={
            index === this.state.selectedCreditor
              ? "selected group_item_padding"
              : "group_item_padding"
          }
          style={{ borderTopWidth: "2px" }}
          onClick={this.creditorSelected(index)}
        >
          {value.name}:<br /> <b>{value.debt}</b>
        </CListGroupItem>
      );
    }
    return (
      <div>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol xs="6" xl="6" className="card_width scrollable max_height">
                <CCard>
                  <CCardHeader className="green_text card_width">
                    They owe you
                  </CCardHeader>
                  <CCardBody className="card_body_items_width">
                    <CListGroup>{peopleOweToUser}</CListGroup>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs="6" xl="6" className="card_width scrollable max_height">
                <CCard>
                  <CCardHeader className="red_text card_width">
                    You owe them
                  </CCardHeader>
                  <CCardBody className="card_body_items_width">
                    <CListGroup>{peopleUserOwesTo}</CListGroup>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter
            className="footer_contract_list_element"
            style={{ textAlign: "center" }}
          >
            <CButton
              size="sm"
              color="dark"
              className="buttons_inside_contract_list "
              disabled={
                this.state.isCreditorSelected && this.state.isDebtorSelected
                  ? false
                  : true
              }
              onClick={this.handleOpenRotationSelectAmount}
            >
              continue
            </CButton>
            <Dialog
              open={this.state.openRotationSelectAmount}
              onClose={this.handleCloseRotationSelectAmount}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <AmountToRotateRotationDialog
                  selectedDebtor={
                    this.state.peopleOweToUser[this.state.selectedDebtor]
                  }
                  selectedCreditor={
                    this.state.peopleUserOwesTo[this.state.selectedCreditor]
                  }
                  mediatorAddress={this.props.address}
                  profile={this.props.profile}
                  handleClose={this.handleCloseRotationSelectAmount}
                />
              </DialogContent>
            </Dialog>
          </CCardFooter>
        </CCard>
      </div>
    );
  }
}

export default ChooseFriendsForRotationRequest;
