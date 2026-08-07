import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});


export async function sendOTP(email,otp){

    await transporter.sendMail({

        from:process.env.EMAIL_USER,

        to:email,

        subject:"JanAwaaz OTP Verification Code",

        html:`
        <div>
            <h2>Welcome to JanAwaaz!</h2>

            <p>Thank you for signing up with JanAwaaz.</p>

            <p>Use the following OTP to verify your email address:</p>

            <h1>${otp}</h1>

            <p>This OTP is valid for <b>5 minutes</b>.</p>

            <p>If you did not request this verification, please ignore this email.</p>

            <br/>

            <p>
                Regards,<br/>
                <b>JanAwaaz Team</b>
            </p>
        </div>
        `
    })

}