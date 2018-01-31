import React, { Component } from "react";
import "./InputFields.css";

export class Input extends Component{
    render(){
        return(
            <input type={this.props.type} value={this.props.value} className={this.props.className} placeholder={this.props.placeholder} onChange={this.props.onChange} />
        );
    }
}

export class Button extends Component{
    constructor(props){
        super(props);
        this.state = {caption: this.props.caption || "Button"};
    }
    render(){
        let loadingAnim;
        if(this.props.isBusy){
            loadingAnim = <span className="Select-loading"></span>
        }
        
        return(
            <button className={this.props.className} onClick={this.props.onClick}>{this.props.caption}{loadingAnim}</button>
        );
    }
}