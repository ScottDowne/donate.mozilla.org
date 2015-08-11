var React = require('react');
import { FormattedHTMLMessage, IntlMixin } from 'react-intl';
import dispatcher from '../scripts/dispatcher.js';

var PageNavButton = React.createClass({
  mixins: [IntlMixin],
  onClick: function() {
    dispatcher.fire("validate" + this.props.forPage);
  },
  render: function() {
    return (
      <div onClick={this.onClick} className="next-button">
        {this.getIntlMessage('next')}
      </div>
    );
  }
});

module.exports = PageNavButton;
