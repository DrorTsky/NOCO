import React from "react";
import CIcon from "@coreui/icons-react";

const printme = () => {
  console.log("in _nav");
};

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Main Page",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Friend",
    to: "/AddFriend",
    icon: <CIcon name="cil-user-follow" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Debt",
    to: "/AddDebt",
    icon: <CIcon name="cil-chart-pie" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Check Rotation",
    to: "/Rotation",
    icon: <CIcon name="cil-arrow-right" customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
