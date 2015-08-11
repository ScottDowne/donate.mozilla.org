var React = require('react');
import { FormattedHTMLMessage, IntlMixin } from 'react-intl';

var PageNavigator = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
      <li data-position="#page-1" className="active">
        <div>{this.getIntlMessage('amount')}</div>
        <div className="page-breadcrumb"></div>
      </li>
    );
  }
});

module.exports = PageNavigator;
