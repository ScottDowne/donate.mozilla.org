var React = require('react');
import dispatcher from '../scripts/dispatcher.js';

var Page = React.createClass({
  getInitialState: function() {
    return {
      currentPage: 1,
      inputs: []
    };
  },
  componentDidMount: function() {
console.log(this.props.children[1].validate);
    dispatcher.on('register' + this.props.pageNumber, this.register);
    dispatcher.on('validate' + this.props.pageNumber, this.validate);
    dispatcher.on('showpage', this.showPage);
  },
  register: function(e) {
    var input = e.detail;
    var inputs = this.state.inputs;
    inputs.push(input);
    this.setState({
      inputs: inputs
    });
  },
  validate: function(e) {
    var errors = 0;
    this.state.inputs.forEach(function(input) {
      if (!input.validate()) {
        errors++;
      }
    });
    if (!errors) {
      dispatcher.fire("showpage", this.props.pageNumber+1);
    }
  },
  componentWillUnmount: function() {
    dispatcher.off('register' + this.props.pageNumber, this.register);
    dispatcher.off('validate' + this.props.pageNumber, this.validate);
    dispatcher.off('showpage', this.showPage);
  },
  showPage: function(e) {
    var detail = e.detail;
    this.setState({
      currentPage: detail
    });
  },
  render: function() {
    var className = "sequence-page";
    if (this.state.currentPage > this.props.pageNumber){
      className += " page-hidden-complete";
    } else if (this.state.currentPage < this.props.pageNumber){
      className += " page-hidden-incomplete";
    }
console.log(this.props.children[1].validate);
    return (
      <fieldset id={"page-" + this.props.pageNumber} className={className}>
        {this.props.children}
      </fieldset>
    );
  }
});

module.exports = Page;
