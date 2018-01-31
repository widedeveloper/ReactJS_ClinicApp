import React, {Component} from 'react';
import './InitialsIcon.css';
export default class InitialsIcon extends Component{
    render(){
        let initials = [];

        if (this.props.name) {
            let parts = this.props.name.split(' ');
            for (let i = 0; i < parts.length; i++) {
                initials.push(parts[i].charAt(0));
            }
        }
        return(
            <div className='initials-icon'>
                <div>
                    <span className='fi'>{initials[0]}</span><span className='li'>{initials[1]}</span>
                </div>
            </div>
        )
    }
}