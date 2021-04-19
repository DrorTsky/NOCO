import React, { Component } from "react";

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

// SOL RELATED
import web3 from "../../web3.js";
import profileAbi from "../../profile";

export class AddFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: this.props.playerOne,
      address: this.props.playerOne,
      phoneNumber: "",
      profile: this.props.profile,
      friendsList: [],
      // friend: [],
      allFriends: [],
    };
    this.addFriendFormSubmit = this.addFriendFormSubmit.bind(this);
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.onCheckMyFriends = this.onCheckMyFriends.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }
  // static profile = new web3.eth.Contract(profileAbi, this.props.playerOne);
  async componentDidMount() {
    // console.log(this.state.friendsList);
    let ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      await ethereum.enable();
    }
    this.onCheckMyFriends();
  }

  onCheckMyFriends = async () => {
    this.setState({
      friendsList: await this.props.profile.methods.getFriends().call(),
    });
    const length = this.state.friendsList.length;
    if (length > 0) {
      for (var index = 0; index < length; index++) {
        this.setState({
          allFriends: [
            ...this.state.allFriends,
            await this.props.profile.methods.getFriendsByIndex(index).call(),
          ],
        });
      }
    }
  };

  addFriendFormSubmit = async (event) => {
    event.preventDefault();
    console.log("in addFriendFormSubmit");
    if (this.state.allFriends.length !== 0) {
      for (const [index, value] of Object.entries(this.state.allFriends)) {
        console.log(value);
        if (
          value.friendAddress !== this.state.friendsAddress ||
          this.state.allFriends.length === 0
        ) {
          this.addFriend();
        } else {
          console.log("friend exists");
          break;
        }
      }
    } else {
      this.addFriend();
    }
  };

  addFriend = async () => {
    const accounts = await web3.eth.getAccounts();

    const friend = await this.props.getFriendFromPhoneNumber(
      this.state.phoneNumber
    );
    console.log(friend);
    const friendsAddress = friend.contractAddress;
    // const friendsAddress = await this.props.getAddressFromPhoneNumber(
    //   this.state.phoneNumber
    // );
    // console.log(friendsAddress);

    // Getting accounts list
    // Getting a reference to a friendsProfile - NOTE: it will work only if the user provided us friendsProfile address
    const friendsProfile = new web3.eth.Contract(profileAbi, friendsAddress);

    console.log(friendsProfile);

    // NOTE: that's how I convert between a batch request and 2 seperate "send" requests:
    const friendsName = friend.username;
    console.log(`friends name: ${friendsName}`);
    console.log(`my name: ${this.props.name}`);
    makeBatchRequest([
      // add both of the exchanges in a batch request.
      this.state.profile.methods.addFriendRequest(friendsAddress, friendsName)
        .send,
      friendsProfile.methods.addFriendRequestNotRestricted(
        this.state.address,
        this.props.name
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
          <CForm
            action=""
            method="post"
            className="form-horizontal"
            onSubmit={this.addFriendFormSubmit}
          >
            <CCardHeader>Add Friend</CCardHeader>
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
                      id="input1-group1"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={this.state.phoneNumber}
                      onChange={this.onChangeFormInput}
                    />
                  </CInputGroup>
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter className="footer_contract_list_element align_center">
              <CButton
                type="submit"
                size="sm"
                color="success"
                className="buttons_inside_contract_list"
              >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                className="buttons_inside_contract_list"
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </div>
    );
  }
}

export default AddFriend;
