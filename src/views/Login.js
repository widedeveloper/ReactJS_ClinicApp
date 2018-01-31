import React, { Component } from "react";
import logo from "../images/bp-logo.png";
import { ClinicSelectList } from "../components/DataSelectList";
import "./Login.css";
import { Input, Button } from "../components/InputFields";
import {Redirect} from "react-router-dom";
import {Account} from "../api/Service";
export class LoginView extends Component{
    constructor(props){
        super(props);
        this.account = new Account();
        this.login = this.login.bind(this);
        this.handleClinicSelect = this.handleClinicSelect.bind(this);
        this.handlePinInput = this.handlePinInput.bind(this);
        this.state = {
            loggedIn: false,
            loginBtnCaption: 'Sign In',
            isBusy: false
        };
    }
    login(){

        if(this.state.isBusy)return;

        if(this.state.clinic && this.state.pin){
        
          this.account.login(this.state.clinic.value, this.state.pin, (account) => {
                this.setState({loggedIn:account.isLoggedIn, loginFailed:true, isBusy:false, loginBtnCaption:'Sign In'});

          });  

          this.setState({isBusy:true, loginBtnCaption:'Signing In... '});
        }
    }



    handleClinicSelect(newValue){
        console.log("Clinic Selected: " , newValue);
        this.setState({clinic:newValue});
    }

    handlePinInput(e){
        
        let pin = e.target.value;
        console.log("Pin Change:", pin);
        this.setState({pin:pin});
    }

    render(){
        if(this.state.loggedIn){
            return(
                <Redirect to={
                    {
                        pathname: '/appointments',
                        state: {from: "/"}
                    }
                } />
            )
        }

        let error = "";

        if(this.state.loginFailed){
            error = <span className="login-fail">Login Failed. Please Try again</span>
        }

        return (
            <div className="LoginView">
                <div className="decoration"></div>
                <div className="content">                    
                    <div>
                        <div className="login-header">
                            <img src={logo} alt="Logo" /> <span>Appointment<br />Manager</span>
                        </div>
                        <ClinicSelectList onChange={this.handleClinicSelect} />
                        <Input type="password" className="pin" placeholder="Pin Number" onChange={this.handlePinInput} />
                        <Button className="sign-in green" caption={this.state.loginBtnCaption} isBusy={this.state.isBusy} onClick={this.login} />
                        {error}
                        <div className="forgot-pin-text">
                            <span>Forgot your PIN?</span><br/>
                            <span>Contact BioPed Franchising at email@bioped.com</span>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    &copy; Copyright BioPed Franchising Inc.All rights reserved.
                </div>
            </div>
        );
    }
}