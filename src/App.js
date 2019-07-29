import React, { Component } from "react";
import "./App.css";
import { initApi } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {},
      value: "",
      cta: "",
      style:""
    };
  }

  componentWillMount() {
    initApi(api => {
      api.window.startAutoResizer();
      this.setState({
        value: api.field.getValue(),
        api: api
      });
    });
  }

  // handleClickUpdate = e => {
  //   const { api, value } = this.state;
  //   api.field.setValue(value);
  // };

  handleChangeValue = e => {
    console.log(e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { value, style, cta } = this.state;
    console.log(this.state)

    const buttonClassName = style || 'noStyle'
    const buttonCTA = cta || 'UPDATE THIS ABOVE'

    return (
      <div className="App">
        CTA: <input
        name="cta"
          className="cf-form-input"
          type="text"
          value={cta}
          onChange={this.handleChangeValue}
        />
        <select name="style" onChange={this.handleChangeValue}
        >
          <option>Select a button type</option>
          <option value="primary">primary</option>
          <option value="secondary">secondary</option>
          <option value="tertiary">tertiary</option>
          <option value="quaternary">quaternary</option>
        </select>
        <button
          className={buttonClassName}
          onClick={this.handleClickUpdate}
        >
          {buttonCTA}
        </button>
      </div>
    );
  }
}

export default App;
