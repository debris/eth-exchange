var Q = require('q');
var nodemailer = require('nodemailer');
var config = require('../config/config');
var users = require('./users');

var transporter;
if (config.mail &&
    config.mail.service &&
    config.mail.username &&
    config.mail.password) {
    
    transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
            user: config.mail.username,
            pass: config.mail.password
        }
    });
} else {
    transporter = {
        sendMail: function (options, callback) {
            console.warn('using fake mail transporter');
            callback(null, "");
        }
    };
}

/**
 * Should be called to send mail.
 */
var sendMail = function (to, subject, message) {
    console.log('sending mail to: ' + to);
    console.log('subject: ' + subject);
    console.log('message: ' + message);
    return Q.ninvoke(transporter, 'sendMail', {
        from: config.mail.username,
        to: to,
        subject: subject,
        text: message
    });
};

var sendMailToAdmins = function (subject, message) {
    return users.getAdmins().then(function (admins) {
        admins.forEach(function (admin) {
            sendMail(admin.email, subject, message);
        });
    });
};

module.exports = {
    sendMail: sendMail,
    sendMailToAdmins: sendMailToAdmins
};

