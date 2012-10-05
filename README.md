# Twilio Numbers

Bulk phone number management for [Node.js](http://nodejs.org) [Twilio](http://twilio.com) applications.

## Usage

Use along with the [twilio](https://github.com/sjwalter/node-twilio) module.

    var TwilioNumbers = require('twilio-numbers')
      , TwilioClient = require('twilio').Client
      , config = require('./config')
      , numbers = new TwilioNumbers(config.twilio_sid, config.twilio_token, config.twilio_app_sid)
      , client = new TwilioClient(config.twilio_sid, config.twilio_token, config.twilio_host);

    // Set up a phone using any available number beginning with area code '604'
    numbers_client.getNumber({"PhoneNumber": "604*******"}, function(number, err) {
      if (err) throw err;
      var phone = client.getPhoneNumber(number);

      phone.setup(function() {
      ...
      // Rest of call is documented in the twilio package.
    });

## License

Licensed MIT. See LICENSE file.
