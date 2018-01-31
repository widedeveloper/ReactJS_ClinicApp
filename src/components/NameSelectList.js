import React, {Component} from 'react';
import Select from 'react-select';
import InitialsIcon from './InitialsIcon';
import './NameSelectList.css';

export default class NameSelectList extends Component{

    constructor(props){
        super(props);
        this.state = {name:"Quincey James"};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val){
        console.log("Name Selected:", val)
        let v = val || {label:""};
        this.setState({name: v.label, selected: val})
    }

    render(){
        return(
            <div className="name-select-list">
                <div className="table align-middle hmax">
                    <div>
                        <div className="icon-holder">
                            <InitialsIcon name={this.state.name} />
                        </div>
                        <div className="select-list-holder">
                            <Select options={[
                                {value:1, label: "Quincey James"},
                                {value:2, label: "Jacky Chan"},
                                {value:3, label: "Roy Orbison"},
                                {value:4, label: "Michelle Laviolette"},
                                {value:5, label: "Jason Price"}
                            ]} onChange={this.handleChange} value={this.state.selected} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}