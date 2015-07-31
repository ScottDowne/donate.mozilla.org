[![Build Status](https://travis-ci.org/mozilla/donate.mozilla.org.svg?branch=master)](https://travis-ci.org/mozilla/donate.mozilla.org)

# donate.mozilla.org
Mozilla donation forms


## Setup

```
$> npm install
$> cp sample.env .env
```

## To run

```
$> npm start
```

## Localization

In this project we're using [React-Intl](https://github.com/yahoo/react-intl) to localize our application and YAML for translation.

#### Localize a component or page

To localize a component or page you have to include `IntlMixin` in your class `mixins`, for example:

``` typescript
var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;

var Example = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
      <div>
      	<h1>{this.getIntlMessage('key_name_here')}
      </div>
    );
  }

});
```

If the strings include HTML, use the `FormattedHTMLMessage` element:

``` typescript
import { FormattedHTMLMessage, IntlMixin } from 'react-intl';

<FormattedHTMLMessage
  message={ this.getIntlMessage("key_name_here") }
/>
```

Once you add the mixin it will expose `getIntlMessage` method to your component to get the localized message for the given key.

#### Adding locale
Because we are using YAML for our translation and React-Intl expects JSON, we need an extra build step to convert YAML to JSON.
We are using [yaml-intl-xml-json-converter](https://www.npmjs.com/package/yaml-intl-xml-json-converter) to convert from YAML to JSON.

##### config for for YAML to JSON conversion

`intl-config.json`
``` json
{
	"supportedLocales": ["en-US", "de", "fr", "pt-BR", "es"],
	"dest": "locales",
	"src": "locales",
	"type": "json"
}
```

##### YAML template

`en-US.yaml`
``` yaml
---
en-US:
  first: This is your first message
  second: This is your second message
```

You have to make sure you match your language code in your YAML file and the name of the file with what you include in your config file for the converting part otherwise it will fail.

### I18N Methods

`i18n.js` file exposes different methods to help with localization. These are the list of available methods when you required the module.

``` js
{
  intlData,
  defaultLang: 'en-US',
  currentLanguage: locale,
  isSupportedLanguage: function(lang),
  intlDataFor: function(lang)
}
```

1. `intlData`
  This object consist of two properties. `locales` and `messages`. We use this object to pass it to React-Router in order for `getIntlMessage` to work properly.

2. `defaultLang`
  This will return default language of the application.

3. `currentLanguage`
  This will return current language of the client that visiting our site.

4. `isSupportedLanguage`
  This method expect a valid language code, and it's used to validate if we support that given language or not.
  The return value is boolean.

5. `intlDataFor`
  This method expect a valid language code, and it will return `intlData` for the given language.



## Tests

#### Selenium

```
$> npm run test:selenium
```

## Making a test stripe donation

We use [Stripe](https://stripe.com) for our non paypal credit card payments.

Stripe provides a handful of [test credit cards](https://stripe.com/docs/testing#cards).

Example: 4242424242424242 works as a test Visa card number.

## Making a test paypal donation

Local development of the form is by default setup to use a paypal sandbox account.

A test account is also provided and the credentials are:

Username: send-donation@test.com

Password: testtest

## Exhange rates

On our donation thank you page, we record donation amounts using the Optimizely conversion tracking tag so we can see which variations of A/B tests we run result in the most donations.

The Optimizely tracking requires we record the donation amount in USD, but many of our transactions happen in other currencies.

We need to convert these donation amounts into USD dollars. To do this, we periodically fetch an updated set of exchange rate data from openexhangerates.org. We store this as a static file on our server as we want to reduce the number of requests to 3rd party services during page load for our end users (this is good for maintaining control over page load times).

Ideally, we keep these rates up to date, but this is not a business critial data source, so in case of downtime or problems fetching the data, we also store a reasonable snap-shot in `/public/exchangerates/rates-backup.json`.

The build script for the website checks if we have a recent snapshot, and if not creates one. If you are working as a developer on the project, you will need to get an API key from https://openexchangerates.org/signup - the 'Free Forever' plan should be sufficient for development.




