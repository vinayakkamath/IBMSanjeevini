const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align: center'>IBM Sanjeevini</h1>"
    );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  console.log(req);
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has been sent 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: details.email, // sender address
    to: user.email, // list of receivers
    subject: "IBM Sanjeevini - " + user.username + " - " + user.empId, // Subject line
    cc: user.ibmemail,
    html: `
    <div style="
    background-color: #e81d25;
    width: -webkit-fill-available;
    height: auto;
    color: #fff;
    padding: 40px;
    float: left;">
    <h2 style="    
    text-align: center;
    margin-top: 0px;
    font-size: 26px;
    border-bottom: 1px solid #fff;
    font-family: cursive;
    background-color: #000;
    padding: 20px;
    font-weight: 100;
    color: #fff;"><img style="width: 20px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTExLjYwNSA1MTEuNjA1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTEuNjA1IDUxMS42MDU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNEMzJGMkY7IiBkPSJNMjY1LjEyNSw1LjA2NmMtMy4zMjgtNS4xNDEtMTAuMTk3LTYuNjEzLTE1LjMzOS0zLjI4NWMtMS4zMjMsMC44NTMtMi40MzIsMS45NjMtMy4yODUsMy4yODUNCglDMjQwLjMzNiwxNi4wOTUsOTUuODAyLDI3NS45NzgsOTUuODAyLDM1MS42MDVjMCw4OC4zNjMsNzEuNjM3LDE2MCwxNjAsMTYwczE2MC03MS42MzcsMTYwLTE2MA0KCUM0MTUuODAyLDI3NS45NzgsMjcxLjI2OSwxNi4wOTUsMjY1LjEyNSw1LjA2NnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFNTczNzM7IiBkPSJNMjU1LjgwMiw0NDcuNjA1Yy01My4wMTMsMC05Ni00Mi45ODctOTYtOTZjMC01Ljg4OCw0Ljc3OS0xMC42NjcsMTAuNjY3LTEwLjY2Nw0KCXMxMC42NjcsNC43NzksMTAuNjY3LDEwLjY2N2MwLDQxLjIzNywzMy40MjksNzQuNjY3LDc0LjY2Nyw3NC42NjdjNS44ODgsMCwxMC42NjcsNC43NzksMTAuNjY3LDEwLjY2Nw0KCUMyNjYuNDY5LDQ0Mi44MjYsMjYxLjY5LDQ0Ny42MDUsMjU1LjgwMiw0NDcuNjA1eiIvPg0KPHBhdGggZD0iTTI1NS44MDIsNTExLjYwNUwyNTUuODAyLDUxMS42MDVjLTg4LjEyOC0wLjEwNy0xNTkuOTE1LTcxLjg3Mi0xNjAtMTU5Ljk3OWMwLTc1LjY0OCwxNDQuNTMzLTMzNS41MzEsMTUwLjY3Ny0zNDYuNTYNCgljMy43NzYtNi43NDEsMTQuODQ4LTYuNzQxLDE4LjYyNCwwYzYuMTY1LDExLjAyOSwxNTAuNjk5LDI3MC45MTIsMTUwLjY5OSwzNDYuNTM5QzQxNS42OTYsNDM5LjczMywzNDMuOTMsNTExLjQ5OCwyNTUuODAyLDUxMS42MDV6DQoJIE0yNTUuODAyLDMyLjMwOWMtNTIuNzU3LDk2LjIzNS0xMzguNjY3LDI2Ni40MTEtMTM4LjY2NywzMTkuMjk2YzAuMDg1LDc2LjM1Miw2Mi4yOTMsMTM4LjU2LDEzOC42NjcsMTM4LjY2Nw0KCWM3Ni4zNzMtMC4xMDcsMTM4LjU2LTYyLjMxNSwxMzguNjY3LTEzOC42ODhDMzk0LjQ2OSwyOTguNzE5LDMwOC41NiwxMjguNTQzLDI1NS44MDIsMzIuMzA5eiIvPg0KPHBhdGggZD0iTTI1NS44MDIsNDQ3LjYwNWMtNTIuOTI4LDAtOTYtNDMuMDcyLTk2LTk2YzAtNS44ODgsNC43NzktMTAuNjY3LDEwLjY2Ny0xMC42NjdzMTAuNjY3LDQuNzc5LDEwLjY2NywxMC42NjcNCgljMCw0MS4xNzMsMzMuNDkzLDc0LjY2Nyw3NC42NjcsNzQuNjY3YzUuODg4LDAsMTAuNjY3LDQuNzc5LDEwLjY2NywxMC42NjdDMjY2LjQ2OSw0NDIuODI2LDI2MS42OSw0NDcuNjA1LDI1NS44MDIsNDQ3LjYwNXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />IBM Sanjeevini</h2>
    <div style="width: 59%; padding-right: 15px;float: left; color: #fff;">
    <p style="margin-top: 0px;font-size: 14px;">Dear IBMers,</p>
    <p style="font-size: 14px;text-align: justify;color: #fff;">${user.username} is in urgent need of (${user.type}) Blood for a ${user.opType} operation scheduled on ${user.date}. If you would like to help please reachout to ${user.username} on the below details.</p><br />
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Requester Name:</strong> ${user.username}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Employee Id:</strong> ${user.empId}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>IBM Location:</strong> ${user.ibmlocation}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Phone:</strong> ${user.phone}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Blood Type:</strong> ${user.type}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Number of Bags:</strong> ${user.bags}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Operation Type:</strong> ${user.opType}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Operation Date:</strong> ${user.date}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Hospital Address:</strong> ${user.hospitalAddr}</p>
    <p style="margin-top: 0px;font-size: 14px;color: #fff;"><strong>Reason:</strong> ${user.reason}</p>
    </div>
    <div style="width: 38%;float: left;">
    <h1 style="
    font-family: cursive;
    text-align: right;
    padding: 20px 10px;
    color: #fff;
    font-size: 60px;
    word-break: break-word;">EVERY BLOOD DONER IS A HERO</h1>
    </div>
    </div>
    `
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
