import React, { Component } from "react";
import web3 from "../../web3.js";
import profileAbi from "../../profile";
//CORE-UI
import { CButton } from "@coreui/react";
//MATERIAL-UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddDebt from "./AddDebt";

export class Friend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendAddress: this.props.friendAddress,
      friendName: "",
      openAddDebt: false,
    };
    this.handleOpenAddDebt = this.handleOpenAddDebt.bind(this);
    this.handleCloseAddDebt = this.handleCloseAddDebt.bind(this);
    this.getNameFromAddress = this.getNameFromAddress.bind(this);
  }

  componentDidMount() {
    this.getNameFromAddress();
  }
  // Add debt state related
  handleOpenAddDebt = () => {
    this.setState({ openAddDebt: true });
  };
  handleCloseAddDebt = () => {
    this.setState({ openAddDebt: false });
  };

  getNameFromAddress = async () => {
    let friendsProfile = new web3.eth.Contract(
      profileAbi,
      this.props.friendAddress
    );
    this.setState({
      friendName: await friendsProfile.methods.getName().call(),
    });
  };
  render() {
    // console.log(this);
    return (
      <div>
        <CButton
          block
          color="light"
          className="friend_button"
          onClick={this.handleOpenAddDebt}
        >
          {this.state.friendName}
        </CButton>
        <Dialog
          open={this.state.openAddDebt}
          onClose={this.handleCloseAddDebt}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className="align_center">
            Add Debt
          </DialogTitle>
          <DialogContent>
            <AddDebt {...this.props} handleClose={this.handleCloseAddDebt} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Friend;
