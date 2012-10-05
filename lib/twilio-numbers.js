var TwilioRestClient = require('twilio').RestClient;

function TwilioNumbers(sid, authToken, appSid) {
  if(!(this instanceof TwilioNumbers)) {
      return new TwilioNumbers(sid, authToken, appSid);
  }

  if(!sid) {
      throw new Error('TwilioNumbers must be provided a SID');
  }

  if(!authToken) {
      throw new Error('TwilioNumbers must be provided an authToken');
  }

  if(!appSid) {
      throw new Error('TwilioNumbers must be provided an application SID');
  }
  this.sid = sid;
  this.authToken = authToken;
  this.appSid = appSid;
  this.twilioClient = new TwilioRestClient(sid, authToken);
}

module.exports = TwilioNumbers;

/**
 *  getNumber: Get a random number from available app Incoming Numbers.
 *
 *  @param {Object} filters
 *    Options include:
 *      PhoneNumber: Return phone number that matches this pattern. Specify
 *        partial numbers and use '*' for any digit.
 *      FriendlyName: Only return a phone number with a friendly name that
 *        exactly matches this name.
 */
TwilioNumbers.prototype.getNumber = function(filters, callback) {
  var self = this;

  this.twilioClient.getIncomingNumbers(filters, function (res, err) {
    if (err) {
      return callback(null, err);
    } else {
      var appNumbers = getAppNumbers(res, self);
      if (appNumbers.length === 0) {
        return callback(null, new Error("No phone number found."));
      }
      var item = Math.floor(Math.random() * appNumbers.length);
      numberRecord = appNumbers[item];
      number = numberRecord.phone_number;

      return callback(number, null);
    }
  });
}

/*
TwilioNumbers.prototype.buyNumbers = function (num, country, filters, callback) {
  this.twilioClient.getAvailableLocalNumbers(country, filters, function (res, err) {
    if (err) {
      return callback(null, err);
    } else {
      return callback(res, null);
    }
  });
}

TwilioNumbers.prototype.deleteNumbers = function (num, filters, callback) {

}
*/

function getAppNumbers(res, client) {
  var appNumbers = [];
  for (var i = 0; i < res.incoming_phone_numbers.length; i++) {
    if (res.incoming_phone_numbers[i].voice_application_sid === client.appSid &&
        res.incoming_phone_numbers[i].sms_application_sid === client.appSid) {
      appNumbers.push(res.incoming_phone_numbers[i]);
    }
  }
  return appNumbers;
}
