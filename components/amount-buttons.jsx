import React from 'react';
import dispatcher from '../scripts/dispatcher.js';

var AmountButtons = React.createClass({
  mixins: [require('react-intl').IntlMixin],
  getInitialState: function() {
    return {
      otherValue: "0",
      showError: false
    };
  },
  componentDidMount: function() {
    var win = window,
        amountButtons = this,
        AMOUNT_SET_PARAM = "preset",
        AMOUNT_PRESET = {
          2: [100, 50, 25, 15]
        };

    // extract query param from url
    // code modified from: http://www.sitepoint.com/url-parameters-jquery/
    $.urlParam = function(name) {
      var results =
        new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
      return results ? results[1] : null;
    };

    $("#amount-other-input").focus(function() {
      $(this).prevAll("input[type='radio']").click();
    });

    function updateAmountOptions(presetNum) {
      if (presetNum && AMOUNT_PRESET[presetNum]) {
        $("input[name='donation_amount']").each(function(idx) {
          if ($(this).attr("id") == "amount-other") {
            return;
          }
          var selectedPreset = AMOUNT_PRESET[presetNum];
          var newAmount = selectedPreset[idx];
          $(this).attr({
            id: "amount-" + newAmount,
            value: newAmount
          });
          $(this).siblings("label").attr({
            for: $(this).attr("id")
          });
          $(this).siblings("label").text("$" + newAmount);
        });
      }
      // amount options have been updated, now show them to users
      $(".row.donation-amount-row").removeClass("hidden-visibility");
    }

    updateAmountOptions($.urlParam(AMOUNT_SET_PARAM));

    $("#amount-other-input")[0].addEventListener("input", function() {
      var amount = $('#amount-other-input').val();
      amountButtons.setState({
        otherValue: amount
      });
    });

    $("#amount-other-input").keydown(function(event) {
      var functionKeys = [8, 9, 13, 27, 37, 39, 46, 110, 190]; // backspace, tab, enter, escape, left arrow, right arrow, delete, decimal point, period
      var numberKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]; // numbers
      var allowed = functionKeys.concat(numberKeys);
      if (allowed.indexOf(event.keyCode) === -1) {
        event.preventDefault();
      }
    });

    // ***********************************************
    // Preselect dollar amount
    // ***********************************************
    function processAmountHash(winLocationHash) {
      var amtRegex = /#amount-([\w\.]+)/;
      var amount = winLocationHash.match(amtRegex)[1];
      if ($(winLocationHash)[0]) {
        $(winLocationHash)[0].checked = true;
      } else {
        $("#amount-other")[0].checked = true;
        $('#amount-other-input').val(amount);
      }
      history.replaceState({
        page: 1,
        hash: '#page-1'
      }, '', '#page-1');
      updateDonateButtonText(amount);
    }

    var winLocationHash = win.location.hash;
    if (winLocationHash.match(/#amount-\d+?/)) {
      processAmountHash(winLocationHash);
    } else if (winLocationHash.match(/#cc-amount-\d+?/)) {
      winLocationHash = winLocationHash.replace("cc-", "");
      processAmountHash(winLocationHash);
      history.pushState({
        page: 2,
        hash: '#page-2'
      }, '', '#page-2');
      $('#payment-cc').prop('checked', true);
      showCreditCardForm();
      hidePage('#page-1', 'complete');
      showPage('#page-2');
    } else {
      history.replaceState({
        page: 1,
        hash: '#page-1'
      }, '', '#page-1');
    }
    dispatcher.fire('register' + this.props.forPage, this);
  },
  clearErrors: function() {
    amountButtons.setState({
      showError: false
    });    
  },
  validate: function() {
    var amountOtherChecked = React.findDOMNode(this.refs.amountOther).checked;
    var valid = true;
    if (amountOtherChecked) {
      if (this.state.otherValue <= 0) {
        valid = false;
      }
    } else if (!React.findDOMNode(this.refs.donationAmount1).checked &&
               !React.findDOMNode(this.refs.donationAmount2).checked &&
               !React.findDOMNode(this.refs.donationAmount3).checked &&
               !React.findDOMNode(this.refs.donationAmount4).checked) {
      valid = false;
    }
    return valid;
  },
  render: function() {
    return (
      <div className="amount-buttons">
        <div className="row donation-amount-row hidden-visibility">
          <div className="third">
            <input onClick={this.clearErrors} ref="donationAmount1" type="radio" name="donation_amount" value="20" id="amount-20"/>
            <label htmlFor="amount-20" className="large-label-size">$20</label>
          </div>
          <div className="third">
            <input onClick={this.clearErrors} ref="donationAmount2" type="radio" name="donation_amount" value="10" id="amount-10"/>
            <label htmlFor="amount-10" className="large-label-size">$10</label>
          </div>
          <div className="third">
            <input onClick={this.clearErrors} ref="donationAmount3" type="radio" name="donation_amount" value="5" id="amount-5"/>
            <label htmlFor="amount-5" className="large-label-size">$5</label>
          </div>
        </div>
        <div className="row donation-amount-row hidden-visibility">
          <div className="third">
            <input onClick={this.clearErrors} ref="donationAmount4" type="radio" name="donation_amount" value="3" id="amount-3"/>
            <label htmlFor="amount-3" className="large-label-size">$3</label>
          </div>
          <div className="two-third">
            <div id="amount-other-container">
              <input type="radio" name="donation_amount" value={this.state.otherValue} ref="amountOther" onClick={this.clearErrors} id="amount-other"/>
              <label htmlFor="amount-other" className="large-label-size">$</label>
              <input onClick={this.clearErrors} id="amount-other-input" ref="amountOtherInput" placeholder={this.getIntlMessage('other_amount')} className="medium-label-size"/>
            </div>
          </div>
        </div>
        <div className="row error-msg-row">
          <div className="full">
            <div className="error-msg">Please select an amount.</div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = AmountButtons;
