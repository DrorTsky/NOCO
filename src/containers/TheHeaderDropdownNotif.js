import React, { Component } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLink,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

export class TheHeaderDropdownNotif extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchanges: [],
      allExchanges: [],
      friendRequests: 0,
      debtRequests: 0,
      rotationRequests: 0,
    };

    this.setTotalRequests = this.setTotalRequests.bind(this);
    this.setFriendRequests = this.setFriendRequests.bind(this);
    this.setDebtRequests = this.setDebtRequests.bind(this);
    this.setRotationRequests = this.setRotationRequests.bind(this);
  }

  componentDidMount() {
    this.setTotalRequests();
  }

  componentDidUpdate(prevProps) {
    if (this.props.totalRequests != prevProps.totalRequests) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.setTotalRequests();
    }
  }

  setTotalRequests = () => {
    this.setState({
      // totalRequests: this.state.exchanges.length,
      totalRequests: this.props.totalRequests,
    });
  };
  setFriendRequests = (num) => {
    this.setState({
      friendRequests: num,
    });
  };
  setDebtRequests = (num) => {
    this.setState({
      debtRequests: num,
    });
  };
  setRotationRequests = (num) => {
    this.setState({
      rotationRequests: num,
    });
  };

  render() {
    let plural =
      this.props.totalRequests === 1 ? "notification" : "notifications";

    // console.log(this);

    let totalBadge, friendBadge, debtBadge, rotationBadge;
    let sumFriendRequests = 0;
    let sumDebtRequests = 0;
    let sumRotationRequests = 0;

    for (const exchange of Object.entries(this.props.allExchanges)) {
      try {
        // console.log(exchange[1]);
        if (exchange[1].exchangePurpose === "0") sumFriendRequests += 1;
        else if (exchange[1].exchangePurpose === "1") sumDebtRequests += 1;
        else if (exchange[1].exchangePurpose === "2") sumRotationRequests += 1;
      } catch {
        console.log("failed to load exchangeDetails");
      }
    }

    totalBadge =
      this.props.totalRequests === 0 ? null : (
        <CBadge shape="pill" color="danger">
          {this.props.totalRequests}
        </CBadge>
      );
    friendBadge =
      sumFriendRequests === 0 ? null : (
        <CBadge shape="pill" color="danger">
          {sumFriendRequests}
        </CBadge>
      );
    debtBadge =
      sumDebtRequests === 0 ? null : (
        <CBadge shape="pill" color="danger">
          {sumDebtRequests}
        </CBadge>
      );
    rotationBadge =
      sumRotationRequests === 0 ? null : (
        <CBadge shape="pill" color="danger">
          {sumRotationRequests}
        </CBadge>
      );

    return (
      <CDropdown inNav className="c-header-nav-item mx-2">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <CIcon name="cil-bell" />
          {totalBadge}
        </CDropdownToggle>
        <CDropdownMenu placement="bottom-end" className="pt-0">
          <CDropdownItem
            header
            tag="div"
            className="text-center"
            color="light"
            style={{ minWidth: "13rem" }}
          >
            <strong>
              You have {this.props.totalRequests} {plural}
            </strong>
          </CDropdownItem>

          <CDropdownItem>
            <CLink
              to={{
                pathname: "/friend_requests",
                requestProps: {
                  compiledBinaryContract: this.props.compiledBinaryContract,
                },
              }}
              className="text-success"
            >
              <CIcon name="cil-user-follow" className="mr-2 text-success" />
              Friend Request
            </CLink>
            <CBadge color="danger" className="mfs-auto">
              {friendBadge}
            </CBadge>
          </CDropdownItem>
          <CDropdownItem>
            <CLink
              to={{
                pathname: "/debt_requests",
                requestProps: {
                  compiledBinaryContract: this.props.compiledBinaryContract,
                },
              }}
              className="text-info"
            >
              <CIcon name="cil-chart-pie" className="mfe-2 mr-2 text-info" />
              Exchange request
            </CLink>
            <CBadge color="danger" className="mfs-auto">
              {debtBadge}
            </CBadge>
          </CDropdownItem>
          <CDropdownItem>
            <CLink
              to={{
                pathname: "/rotation_requests",
                requestProps: {
                  compiledBinaryContract: this.props.compiledBinaryContract,
                },
              }}
              className="text-primary"
            >
              <CIcon name="cil-arrow-right" className="mr-2 text-primary" />
              Rotation request
            </CLink>
            <CBadge color="danger" className="mfs-auto">
              {rotationBadge}
            </CBadge>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    );
  }
}

export default TheHeaderDropdownNotif;
