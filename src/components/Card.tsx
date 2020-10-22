import React, { Component } from "react";

interface Props {
  surname: string;
  otro?: number;
}

export default class Card extends Component<Props> {
  static defaultProps = {
    surname: "JUA",
    // otro: 2,
  };
  componentDidMount() {}
  render(): JSX.Element {
    return (
      <div>
        UNA CARD : {this.props.surname}, {this.props.otro}{" "}
      </div>
    );
  }
}
