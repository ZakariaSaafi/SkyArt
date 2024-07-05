// controllers/passwordController.js
import crypto from 'crypto';
import nodemailer  from 'nodemailer' ;
import  User from '../models/User.js';



export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    const token = crypto.randomBytes(20).toString('hex');

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('User with this email does not exist.');
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '',
            pass: '',
        },
    });

    const mailOptions = {
        to: user.email,
        from: 'passwordreset@skyart.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               http://${req.headers.host}/password/reset/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error('There was an error: ', err);
            return res.status(500).send('Error sending the email.');
        }
        res.status(200).send('Password reset email sent.');
    });
};

export const verifyResetToken = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
    }

    res.render('reset', { token: req.params.token });
};

export const resetPassword = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '',
            pass: '',
        },
    });

    const mailOptions = {
        to: user.email,
        from: 'passwordreset@skyart.com',
        subject: 'Your password has been changed',
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error('There was an error: ', err);
            return res.status(500).send('Error sending the email.');
        }
        res.status(200).send('Password has been reset.');
    });
};
