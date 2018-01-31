import React, { Component } from 'react';
import ServiceView from './ServiceView';
import {PersistentData} from '../api/Service';
import Select from 'react-select';
import './DataSelectList.css';
import InitialsIcon from './InitialsIcon';

export default class DataSelectList extends ServiceView {
    constructor(props){
        super(props, props.service)
        this.updateValue = this.updateValue.bind(this);
        this.remember = new PersistentData('DataSelectListMemory');
    }

    get memoryId(){
        if(this.props.memoryId){
            return this.props.memoryId;
        }

        return this.props.service + '/' + this.props.get;
    }

    rememberSelection(val){
        this.remember.setData(this.memoryId, val);
    }

    recallSelection(){
        let r = this.remember.getData(this.memoryId);
        if(r){
            this.updateValue(r);
        }
        
    }
    parseValue(val) {
        var valueProp = this.props.value || "id";
        var displayName = this.props.name || "displayName";
        const options = val.map(function(item){
            return {value: item[valueProp], label: item[displayName]};
        });
        return options;
    }

    componentWillMount() {
        this.apiFetch(this.props.get);
    }

    componentDidMount(){
        this.recallSelection();
    }

    updateValue(newValue){
        this.setState({selectValue: newValue});
        this.rememberSelection(newValue);
        if(this.props.onChange){
            this.props.onChange(newValue);
        }
    }

    render() {
        let isLoading = (this.state.value === null);
        return (
            <Select options={this.state.value} onChange={this.updateValue} value={this.state.selectValue}  isLoading={isLoading} />
        );
    }
}

export class SelectList extends Select{
    constructor(props){
        super(props);
        
        if(!this.state){
            this.state = {};
        }



        if(this.props.memoryId){

            this.remember = new PersistentData('SelectListMemory');
        }    
        
    }

    get memoryId(){
        if(this.props.memoryId){
            return this.props.memoryId;
        }
    }

    rememberSelection(val){
        if(this.memoryId){
            this.remember.setData(this.memoryId, val);
        }
    }

    recallSelection(){
        if(this.memoryId){
            let r = this.remember.getData(this.memoryId);
            if(r){
                this.updateValue(r);
            }
        }
    }

    componentWillMount(){
        super.componentWillMount();
        this.recallSelection();
    }

  
}

export class CountrySelectList extends Component {
    render() {
        return (
            <DataSelectList service="lookup" get="countries" value="code" name="displayName" caching={true} cacheId="lookup" onChange={this.props.onChange} memoryId={this.props.memoryId} />
        );
    }
}

export class ClinicSelectList extends Component{
    render() {
        return (
            <DataSelectList service="lookup" get="clinic" value="id" name="displayName" onChange={this.props.onChange}  caching={true} cacheId="lookup" memoryId={this.props.memoryId} />
        );
    }
}

