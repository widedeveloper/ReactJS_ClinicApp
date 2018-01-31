import {Component} from 'react';
import { Service } from '../api/Service';


export default class ServiceView extends Component{
    constructor(props, apiRoot) {
        super(props);
        this.service = new Service(this.props.caching, this.props.cacheId);
        this.state = {
            apiRoot: apiRoot,
            value: null
        }
    }

    parseValue(val) {
        return val;
    }

    apiFetch(api, headers) {
        let apiPath = this.state.apiRoot + "/" + api
        this.service.apiFetch(apiPath, headers, (json) => {
            this.setState({value : this.parseValue(json)});
        })
    }


}

export class Lookup extends ServiceView{
    constructor(props){
        super(props, "lookup");
    }
}