import React, {Component} from 'react';
import AppScreenShot from '../images/app-sc.png';
import './Appointments.css';
import {Redirect} from 'react-router-dom';
import {Account} from '../api/Service';
import { Header } from './Appointments/Header';
import GridView from './GridView';
import CalendarView from './CalendarView';

export default class Appointments extends Component{
    constructor(props){
        super(props);
        this.account = new Account();
    }
    render(){
        if (!this.account.isLoggedIn) {
            return (<Redirect
                to={{
                pathname: '/',
                state: {
                    from: "/appointments"
                }
            }}/>)
        }
        return (
            <div>
                <Header account={this.account} />
                <CalendarView cols="7" rows="8" />
            </div>
        );
    }
}