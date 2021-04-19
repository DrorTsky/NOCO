import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      phoneNumber: "",
    };
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit = async () => {
    await this.props.isLoggedInCheck(this.state.phoneNumber);
  };

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
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                {/* <CForm action="" method="post" onSubmit={this.onFormSubmit}> */}
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {/* <CInputGroup className="mb-3">
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
                          autoComplete="false"
                          onChange={this.onChangeFormInput}
                          required
                        />
                      </CInputGroup> */}
                      <CInputGroup className="mb-4">
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
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            // type="submit"
                            onClick={this.onFormSubmit}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton
                            color="link"
                            className="px-0"
                            to={{
                              pathname: "./register",
                              registerProps: {
                                writeUserData: this.props.writeUserData,
                                compiledBinaryContract: this.props
                                  .compiledBinaryContract,
                              },
                            }}
                          >
                            Not registered?
                          </CButton>
                        </CCol>
                      </CRow>
                      <CRow>
                        <h6>{this.props.NotRegisteredMessage}</h6>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard> */}
                {/* </CForm> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
