import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddFriend from "../views/forms/AddFriend";
import AddDebt from "../views/forms/AddDebt";
import ChooseFriendForDebtRequest from "src/views/forms/ChooseFriendForDebtRequest";
// CORE-UI
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

//MATERIAL-UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// routes config
import routes from "../routes";

import { TheHeaderDropdownNotif } from "./index";

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  //// ***************************************************************************
  //// OPEN DIALOGS
  //// ***************************************************************************
  const [openCheckRotation, setOpenCheckRotation] = useState(false);
  const handleOpenCheckRotation = () => {
    setOpenCheckRotation(true);
  };
  const handleCloseCheckRotation = () => {
    setOpenCheckRotation(false);
  };
  // Add friend state related
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const handleOpenAddFriend = () => {
    setOpenAddFriend(true);
  };
  const handleCloseAddFriend = () => {
    setOpenAddFriend(false);
  };
  // console.log(props);
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/AddDebt">Add Debt</CHeaderNavLink>
        </CHeaderNavItem>

        <CHeaderNavItem className="px-3">
          <CHeaderNavLink onClick={handleOpenCheckRotation}>
            Check Rotation
          </CHeaderNavLink>
          <Dialog
            open={openCheckRotation}
            onClose={handleCloseCheckRotation}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Choose Rotation</DialogTitle>
            <DialogContent>
              <h1>OPEN</h1>
            </DialogContent>
          </Dialog>
        </CHeaderNavItem>

        <CHeaderNavItem className="px-3">
          <CHeaderNavLink onClick={handleOpenAddFriend}>
            Add friend
          </CHeaderNavLink>
          <Dialog
            open={openAddFriend}
            onClose={handleCloseAddFriend}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Friend</DialogTitle>
            <DialogContent>
              <AddFriend />
            </DialogContent>
          </Dialog>
        </CHeaderNavItem>

        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif {...props} />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
