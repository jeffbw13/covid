import React from 'react';
import SwitchModule from 'react-switch';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.label = props.label ? props.label : 'some label ';
    this.checked = props.checked ? props.checked : false;
    this.state = { checked: this.checked };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    this.props.onUpdateShow(this.props.showWhat, checked);
  }

  render() {
    //alert(this.state.checked);
    return (
      <label>
        <span>{this.label}</span>
        <SwitchModule onChange={this.handleChange}
                checked={this.state.checked}
                uncheckedIcon={false}
                height={17}
                width={30}
        />
      </label>
    );
  }
}
export default Switch;