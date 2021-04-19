import React, { Component } from "react";
import { Redirect } from "react-router";
import web3 from "../../../web3.js";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      phoneNumber: "",
      address: "",
      redirect: false,
      isDeploying: false,
    };

    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    this.deployAProfileContract = this.deployAProfileContract.bind(this);
    this.deploy = this.deploy.bind(this);
  }
  onSubmitRegister = async () => {
    console.log("in register");
    this.setState({
      isDeploying: true,
    });
    const newContract = await this.deployAProfileContract(this.state.username);
    console.log("deployed");
    console.log(newContract);
    this.setState({
      isDeploying: false,
    });
  };
  deploy = async () => {
    console.log(this.state.username);
    const newContract = await this.deployAProfileContract(this.state.username);
    console.log("deployed");
    console.log("creating user");
    await this.props.location.registerProps.writeUserData(
      this.state.phoneNumber,
      this.state.username,
      newContract.options.address
    );
    console.log("finished");
    this.setState({
      redirect: true,
    });
  };

  deployAProfileContract = async (profileContractName) => {
    const compiledProfileContract = require("../../../solidity/build/ProfileContract.json");
    console.log(`deploying ${profileContractName}`);
    const accounts = await web3.eth.getAccounts();

    return await new web3.eth.Contract(
      JSON.parse(compiledProfileContract.interface)
    )
      .deploy({
        data: compiledProfileContract.bytecode,
        arguments: [profileContractName],
      })
      .send({
        from: accounts[0],
        gas: "4000000",
      });
  };

  onChangeFormInput(event) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  }
  render() {
    console.log(this);
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  {/* <CForm
                    // action="/register"
                    // method="post"
                    onSubmit={this.deploy}
                  > */}
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      id="userName"
                      name="username"
                      type="text"
                      placeholder="Username"
                      autoComplete="off"
                      onChange={this.onChangeFormInput}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-phone" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone number"
                      autoComplete="off"
                      onChange={this.onChangeFormInput}
                      required
                    />
                  </CInputGroup>
                  <CButton
                    color="success"
                    block
                    onClick={this.deploy}
                    // type="submit"
                  >
                    Create Account
                  </CButton>
                  <CButton color="secondary" block to="/">
                    Already have an account?
                  </CButton>
                  {/* </CForm> */}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {/* <CRow>
            <button onClick={this.deploy}>deploy</button>
          </CRow> */}
        </CContainer>
      </div>
    );
  }
}

export default Register;
