import React, { Component } from "react";
import web3 from "../../web3.js";
import profileAbi from "../../profile";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CFormText,
  CRow,
} from "@coreui/react";

// var debtRequestType = {
//   debtRequest: "0",
//   debtRotationRequest: "1",
// };

var debtRotationStatus = {
  MediatorAgreed: "0",
  ReceiverAgreed: "1",
  SenderAgreed: "2",
  Done: "3",
};

export class AmountToRotateRotationDialog extends Component {
  constructor(props) {
    super(props);

    this.state = { amountToRotate: 0, maxAmountToRotate: 0 };
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.submitRotation = this.submitRotation.bind(this);
    this.generateDebtRotation = this.generateDebtRotation.bind(this);
    // this.findDebtIndex = this.findDebtIndex.bind(this);
  }

  submitRotation = (event) => {
    event.preventDefault();
    // console.log(this);
    this.generateDebtRotation();
    this.props.handleClose();
  };

  componentDidMount() {
    const maxAmountToRotate =
      parseInt(this.props.selectedCreditor.debt) >
      parseInt(this.props.selectedDebtor.debt)
        ? parseInt(this.props.selectedDebtor.debt)
        : parseInt(this.props.selectedCreditor.debt);

    this.setState({ maxAmountToRotate: maxAmountToRotate });
  }

  generateDebtRotation = async () => {
    let accounts = await web3.eth.getAccounts();
    const creditorProfile = new web3.eth.Contract(
      profileAbi,
      this.props.selectedCreditor.friendsAddress
    );
    const debtorProfile = new web3.eth.Contract(
      profileAbi,
      this.props.selectedDebtor.friendsAddress
    );
    // let allExchanges = await this.props.profile.methods
    //   .getAllExchanges()
    //   .call();
    // console.log(allExchanges);
    // let lastDebtRotationRequestIndex = this.findDebtIndex(
    //   allExchanges,
    //   this.props.selectedCreditor,
    //   this.props.mediatorAddress,
    //   this.props.selectedDebtor,
    //   debtRequestType.debtRotationRequest
    // );
    // console.log(lastDebtRotationRequestIndex);
    // console.log(
    //   `${this.props.mediatorAddress} , ${this.props.selectedCreditor.friendsAddress}, ${this.props.selectedDebtor.friendsAddress}, ${this.state.amountToRotate}`
    // );

    await this.props.profile.methods
      .addDebtRotationRequestNotRestricted(
        this.props.mediatorAddress,
        this.props.selectedCreditor.friendsAddress,
        this.props.selectedDebtor.friendsAddress,
        this.state.amountToRotate,
        debtRotationStatus.MediatorAgreed,
        0
      )
      .send({ from: accounts[0], gas: "1000000" });
    await debtorProfile.methods
      .addDebtRotationRequestNotRestricted(
        this.props.mediatorAddress,
        this.props.selectedCreditor.friendsAddress,
        this.props.selectedDebtor.friendsAddress,
        this.state.amountToRotate,
        debtRotationStatus.MediatorAgreed,
        0
      )
      .send({ from: accounts[0], gas: "1000000" });
    await creditorProfile.methods
      .addDebtRotationRequestNotRestricted(
        this.props.mediatorAddress,
        this.props.selectedCreditor.friendsAddress,
        this.props.selectedDebtor.friendsAddress,
        this.state.amountToRotate,
        debtRotationStatus.MediatorAgreed,
        0
      )
      .send({ from: accounts[0], gas: "1000000" });
  };

  // *****************************************************
  //                  FORM CHANGE HANDLERS
  // *****************************************************
  onChangeFormInput(event) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    if (!Number(value)) {
      return;
    } else {
      parseInt(value) > this.state.maxAmountToRotate
        ? this.setState({ [name]: this.state.maxAmountToRotate })
        : this.setState({ [name]: value });
    }
    // this.setState({ [name]: value });
  }

  render() {
    // console.log(this);
    return (
      <div>
        <CCard>
          <CCardHeader style={{ textAlign: "center" }}>
            How Much to Rotate?
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" onSubmit={this.submitRotation}>
              <CFormGroup>
                <CRow>
                  <CInput
                    id="amountDebt"
                    name="amountToRotate"
                    placeholder="Amount"
                    autoComplete="off"
                    onChange={this.onChangeFormInput}
                    required
                    style={{
                      textAlign: "center",
                      maxWidth: "70%",
                      paddingRight: "10%",
                    }}
                  />
                  <CFormText style={{ paddingLeft: "5%", fontSize: "130%" }}>
                    / {this.state.maxAmountToRotate}
                  </CFormText>
                </CRow>
                {this.state.amountToRotate !== 0 ? (
                  <CRow>
                    <CFormText>
                      transferring: {this.state.amountToRotate}
                    </CFormText>
                  </CRow>
                ) : (
                  ""
                )}
              </CFormGroup>
              <CFormGroup style={{ textAlign: "center" }}>
                <CButton
                  type="submit"
                  size="sm"
                  color="secondary"
                  className="confirm_button"
                  disabled={this.state.amountToRotate > 0 ? false : true}
                >
                  Confirm
                </CButton>
              </CFormGroup>
            </CForm>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default AmountToRotateRotationDialog;
