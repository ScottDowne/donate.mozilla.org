var React = require('react');

var PageNavigatorContainer = React.createClass({
  render: function() {
    return (
      <ol className="progress">
        {this.props.container}
      </ol>
    );
  }
});

module.exports = PageNavigatorContainer;
