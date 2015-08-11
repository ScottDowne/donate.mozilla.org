import React from 'react';
import Footer from '../components/footer.jsx';
import Header from '../components/header.jsx';
import SectionHeading from '../components/section-heading.jsx';
import AmountButtons from '../components/amount-buttons.jsx';
import Frequency from '../components/donation-frequency.jsx';
import PayPalButton from '../components/paypal-button.jsx';
import CreditCardButton from '../components/credit-card-button.jsx';
import FormContainer from '../components/form-container.jsx';
import Page from '../components/page.jsx';
import PageNavigatorContainer from '../components/page-navigator-container.jsx';
import PageNavigator from '../components/page-navigator.jsx';
import NextButton from '../components/page-navigator-button.jsx';

var SingleForm = React.createClass({
  mixins: [require('react-intl').IntlMixin],
  render: function() {
    return (
      <div className="single-form mozilla-eoy-donation">
        <Header/>
        <FormContainer>
          <PageNavigatorContainer>
            <PageNavigator pageNumber={1} name="Amount"/>
            <PageNavigator pageNumber={2} name="Payment"/>
            <PageNavigator pageNumber={3} name="Personal"/>
          </PageNavigatorContainer>
          <div className="sequence-page-container">
            <Page pageNumber={1}>
              <SectionHeading>
                <h2>{this.getIntlMessage("donate_now")}</h2>
              </SectionHeading>
              <AmountButtons forPage={1}/>
              <Frequency forPage={1}/>
              <NextButton forPage={1}/>
            </Page>
            <Page pageNumber={2}>
              <SectionHeading>
                <h4>{this.getIntlMessage("choose_payment")}</h4>
                <p id="secure-label"><i className="fa fa-lock"></i>{this.getIntlMessage('secure')}</p>
              </SectionHeading>
              <CreditCardButton/>
              <PayPalButton/>
            </Page>
          </div>
        </FormContainer>
        <Footer/>
      </div>
    );
  }
});

module.exports = SingleForm;
