import React, { Component } from "react";
import logo from "../../images/bp-logo.png";
import { ClinicSelectList } from "../../components/DataSelectList";
import NameSelectList from "../../components/NameSelectList";
import './Header.css';
import DateSelectorView from '../../views/DateSelectorView';

export class Header extends Component{
    constructor(props){
        super(props);
        this.account = props.account;
    }
    render(){
        return(
            <div className="appointment-header table hmax">
                <div>
                    <div>
                        <img className='logo' src={logo} alt="" />
                        <ClinicSelectList memoryId="AppClinicView" />
                        <NameSelectList />
                    </div>
                    <div className="hmax align-center">
                        <DateSelectorView />
                    </div>
                    
                </div>
            </div>
        )
    }
}