import React, { Component, Suspense } from "react";
// import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

export class TheContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    this.props.setStateAndAmountOfExchanges();
    return (
      <main className="c-main" style={{ paddingTop: "1rem" }}>
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <CFade>
                          <route.component {...this.props} />
                        </CFade>
                      )}
                    />
                  )
                );
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>
    );
  }
}
export default React.memo(TheContent);
