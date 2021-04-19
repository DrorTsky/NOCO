import React, { Component } from "react";
import ExchangeRequest from "./ExchangeRequest";

// 0xE6123F02ebc3528f29F23E79797744B88a0Cb851
//
export class Exchanges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchanges: [],
      allExchanges: [],
      profile: this.props.profile,
    };
    this.setStateAndAmountOfExchanges = this.setStateAndAmountOfExchanges.bind(
      this
    );
  }

  setStateAndAmountOfExchanges = async () => {
    this.setState({
      exchanges: await this.state.profile.methods.getAllExchanges().call(),
    });
    const length = this.state.exchanges.length;
    if (length > 0) {
      for (var index = 0; index < length; index++) {
        this.setState({
          allExchanges: [
            ...this.state.allExchanges,
            await this.props.profile.methods
              .getAllExchangesByIndex(index)
              .call(),
          ],
        });
      }
    }
  };

  async componentDidMount() {
    if (
      (await this.state.profile.methods.getAllExchanges().call())[0] !==
      undefined
    ) {
      var exchange = {};
      Promise.resolve(
        (exchange = (
          await this.state.profile.methods.getAllExchanges().call()
        )[0].transaction)
      ).then(this.setStateAndAmountOfExchanges());
    }
  }

  render() {
    // console.log(this);
    const allExchanges = [];
    for (const exchange of Object.entries(this.state.allExchanges)) {
      try {
        if (this.props.type === exchange[1].exchangePurpose) {
          // console.log(exchange[1]);
          allExchanges.push(
            <ExchangeRequest
              key={exchange[1].exchangeDetails.exchangeId}
              exchangePurpose={exchange[1].exchangePurpose}
              source={exchange[1].exchangeDetails.source}
              destination={exchange[1].exchangeDetails.destination}
              sourceName={exchange[1].exchangeDetails.sourceName}
              destinationName={exchange[1].exchangeDetails.destinationName}
              creationDate={exchange[1].exchangeDetails.creationDate}
              amount={exchange[1].transaction.amount}
              exchange={exchange[1]}
              profile={this.props.profile}
              compiledBinaryContract={this.props.compiledBinaryContract}
              playerOne={this.props.playerOne}
              index={exchange[0]}
              setStateAndAmountOfExchanges={
                this.props.setStateAndAmountOfExchanges
              }
            />
          );
        }
      } catch {
        console.log("failed to load exchangeDetails");
      }
    }
    const isAllExchangesEmpty = allExchanges.length;

    return (
      <div>
        {isAllExchangesEmpty === 0 ? <h3>no exchanges yet</h3> : allExchanges}
      </div>
    );
  }
}

export default Exchanges;
