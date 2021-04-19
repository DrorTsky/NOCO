import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupText,
  CInputGroupAppend,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// SOL RELATED
import web3 from "../../web3.js";
import profileAbi from "../../profile";

export class AddDebt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // friendsAddress: this.props.friendAddress,
      // friendRequestIndex: "",
      providedAmount: "",
      playerTwo: this.props.friendAddress,
      // friendsList: [],
      // exchanges: {},
      contractsList: [],
    };

    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.onSubmitAddDebtRequest = this.onSubmitAddDebtRequest.bind(this);
  }

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
      this.props.friendAddress
    );

    makeBatchRequest([
      // add both of the exchanges in a batch request.
      // the difference: addDebtRequest(destination, same other args), addDebtRequestNotRestricted(source, same other args)
      this.props.profile.methods.addDebtRequest(
        this.props.friendAddress,
        this.props.playerOne,
        this.state.providedAmount,
        this.props.friendAddress
      ).send,
      friendsProfile.methods.addDebtRequestNotRestricted(
        this.props.playerOne,
        this.props.playerOne,
        this.state.providedAmount,
        this.props.friendAddress
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

    this.props.handleClose();
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
  render() {
    // console.log(this);
    return (
      <div>
        <CCard>
          <CCardHeader className="align_center">Send Debt Request</CCardHeader>
          <CCardBody>
            <CForm
              action=""
              method="post"
              onSubmit={this.onSubmitAddDebtRequest}
            >
              {/* <CFormGroup>
                <CInputGroup>
                  <CInput
                    id="toDebtRequest"
                    name="friendsAddress"
                    placeholder="To"
                    autoComplete="To"
                    value={this.state.friendsAddress}
                    onChange={this.onChangeFormInput}
                  />
                  <CInputGroupAppend>
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </CFormGroup> */}
              <CFormGroup>
                <CInputGroup>
                  <CInput
                    id="amountDebt"
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
              <CFormGroup className="form-actions align_center">
                <CButton
                  type="submit"
                  size="sm"
                  color="secondary"
                  className="confirm_button"
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

export default AddDebt;
