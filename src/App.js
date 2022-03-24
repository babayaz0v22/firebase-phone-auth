import React from 'react'
import {authentication} from './firebase'
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
class App extends React.Component {



    handleChange = (e) =>{
        const {name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    configureCaptcha = () =>{
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                this.onSignInSubmit();
                console.log("Recaptca varified")
            }
        }, authentication);
    }
    onSignInSubmit = (e) => {
        e.preventDefault()
        this.configureCaptcha()
        const phoneNumber = '+' + this.state.mobile
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent")
            }).catch((error) => {
                console.log(error);
                console.log("SMS not sent")
            });
    }
    onSubmitOTP = (e) =>{
        e.preventDefault()
        const code = this.state.otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            console.log(JSON.stringify(user))
            alert("User is verified")
        }).catch((error) => {
            // ...
        });
    }
    render() {
        return (
            <div>
                <h2>Login Form</h2>
                <form onSubmit={this.onSignInSubmit}>
                    <div id="sign-in-button"></div>
                    <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
                    <button type="submit">Submit</button>
                </form>

                <h2>Enter OTP</h2>
                <form onSubmit={this.onSubmitOTP}>
                    <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default App

// import './App.css';
// import {useState} from "react";
// import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
// import {authentication} from "./firebase"
//
// function App() {
//
//         const countryCode = "+998"
//         const [phoneNumber, setPhoneNumber] = useState(countryCode);
//         const [expandForm, setExpandForm] = useState(false);
//         const [OTP] = useState('');
//
//         const generateRecaptcha = () => {
//             window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//                 'size': 'normal',
//                 'callback': (response) => {
//                 },
//                 'expired-callback': () => {
//                 }
//             }, authentication);
//         };
//
//         const requestOTP = () => {
//                 setExpandForm(true);
//                 generateRecaptcha();
//                 let appVerifier = window.recaptchaVerifier;
//                 signInWithPhoneNumber(authentication, "+998974579171", appVerifier)
//                     .then((confirmationResult) => {
//                         window.confirmationResult = confirmationResult;
//                     }).catch((error) => {
//                     console.log(error);
//                 });
//         }
//
//         return (
//             <div className="App">
//                 <form onSubmit={requestOTP}>
//                     <h1>Sign in with phone number</h1>
//                     <div className='mb-3'>
//                         <label htmlFor='phoneNumberInput' className='form-label'>Phone Number</label>
//                         <input type='tel' className='form-control' id='phoneNumberInput' aria-describedby="emailHelp"/>
//                         <div id='phoneNumberInput' className='form-text'>Please enter your phone number</div>
//                     </div>
//                     {expandForm === true ?
//                         <>
//                             <div className='mb-3'>
//                                 <label htmlFor='otpInput' className='form-label'>OTP</label>
//                                 <input type='number' className='form-control' id='otpInput'/>
//                                 <div id='otpHelp' className='form-text'>Please enter the one time pin sent your phone
//                                 </div>
//                             </div>
//                         </>
//                         :
//                         null
//                     }
//                     {
//                         expandForm === false ?
//                             <button type='submit' className='btn btn-primary' onClick={() => setPhoneNumber(phoneNumber)}>Request OTP</button>
//                             : null
//                     }
//                     <div id='recaptcha-container'></div>
//                 </form>
//             </div>
//         );
//     }
// export default App;
//

