import React, { Component , Fragment} from "react";
import "./App.css";
import { initApi } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {},
      value: {
        cta: "",
        style: "",
        bgcolor: ""
      }
    };
  }

  componentWillMount() {
    initApi(api => {
      api.window.startAutoResizer();
      console.log("GET VALUE:", api.field.getValue())
      const value = api.field.getValue() || {
          cta: "",
          style: "",
          bgcolor: ""
        }
      this.setState({
        value: value,
        api: api
      });
    });
  }

  handleClickUpdate = e => {
    const { api, value } = this.state;
    api.field.setValue(value);
  };

  handleChangeValue = e => {
    // console.log(e.target.name)
    let value = this.state.value
    value.cta = (e.target.name === "cta") ? e.target.value : this.state.value.cta
    // console.log(": App -> valOrig", value)
    value.style = (e.target.name === "style") ? e.target.value : this.state.value.style
    value.bgcolor = (e.target.name === "bgcolor") ? e.target.value : this.state.value.bgcolor
    
    console.log(value)
    this.setState({
      value
    });
  };

  render() {
    const { value } = this.state;
    console.log(": App -> render -> value", value)
    console.log("STATE:", this.state)

    console.log(": App -> render -> value.style", value.style)
    const buttonClassName = value.style || 'noStyle'
    
    const buttonCTA = value.cta || 'UPDATE THIS ABOVE'
    const buttonPageClass = value.bgcolor || 'defaultBackground'
    const optionsState = buttonClassName
    console.log(": App -> render -> optionsState", optionsState)

    return (
      <Fragment><div className="App">
        {/* val: {value} */}
        {/* <div>
        Button text: <input
        name="cta"
          className="cf-form-input"
          type="text"
          value={value.cta}
          onChange={this.handleChangeValue}
        /></div> */}
        <div><br />Page background color: <br /><input name="bgcolor" type="radio" value='light' checked={value.bgcolor === 'light'} onChange={this.handleChangeValue}/> light<br />
        <input name="bgcolor" type="radio" value='dark' checked={value.bgcolor === 'dark'} onChange={this.handleChangeValue}/> dark</div>
        <div>
        <br />Button type: <br />
        <select name="style" value={optionsState} onChange={this.handleChangeValue}
        >
          <option>Select a button type</option>
          <option value="primary">primary</option>
          <option value="secondary">secondary</option>
          <option value="tertiary">tertiary</option>
          <option value="quaternary">quaternary</option>
        </select></div><div 
        className={buttonPageClass}>
          <div>
        Button text: <input
        name="cta"
        id="cta2"
          className={buttonClassName}
          type="text"
          value={value.cta}
          onChange={this.handleChangeValue}
        /></div>
        {/* <button
          className={buttonClassName}
          // onClick={this.handleClickUpdate}
        >
          {buttonCTA}
        </button> */}
        </div>
        <div><button
          className="update-button cf-btn-primary"
          onClick={this.handleClickUpdate}
        >
          SAVE THIS BUTTON
        </button></div>
      </div>
      </Fragment>
    );
  }
}

export default App;
