import React, {Component} from 'react';
import DateHelper from '../components/DateHelper';
import GridView from './GridView';
import './CalendarView.css';

export default class CalendarView extends Component{
    
    constructor(props){
        super(props);
    }

    startCurrentTimeLine(){

    }

    getCalenderItems(){
        let items = [];
        for(var i = 0; i < 5; i++){
            items.push({
                x:i,
                y:parseInt(Math.random() * 7, 10) * 4,
                w:1,
                h:parseInt(Math.random() * 4, 10) + 2,
                maxW:1,
                minW:1,
                dom: <CalenderItem />
            })
        }

        return items;
    }


    isToday(date){
        let d = new Date();
        return d.getFullYear() == date.getFullYear() && date.getMonth() == d.getMonth() && d.getDate() == date.getDate();
    }

    weekView(){
        let dh = new DateHelper();
        let weekRange = dh.getWeekRange();
        let weekStart = weekRange[0];
        let days = [];
        let time = [];


        for(let i=0; i < 7; i++){
            days.push(<div className={this.isToday(weekStart)? "today" : ""}>{dh.dayNames[weekStart.getDay()]} {weekStart.getDate()}</div>);
            weekStart.setDate(weekStart.getDate() + 1);
        }

        days = <div className="date-headers table align-center align-middle layout-fixed hmax">
            <div>
                {days}
            </div>
        </div>

        let startTime = 8;

        for(let i=0; i < 12; i++){
            let ampm = ((startTime + i) < 12)? "AM":"PM";
            let hour = (startTime + i) % 12;
            hour = hour ? hour : 12;
            time.push(<div><div><span>{hour} {ampm}</span></div></div>)
        }

        time = <div className='table vmax time-margin align-center hmax'>{time}</div>

        return(
            <div className="table hmax align-top">
                <div>
                    <div></div>
                    <div>{days}</div>
                </div>
                <div>
                    <div className="timeContainer">
                        <div>{time}</div>
                    </div>
                    <div>
                        
                        <GridView cols="7" rows="12" />
                        <div className="interact-zone">
                            <GridView cols="7" rows="12" mode="react" items={this.getCalenderItems()} />
                        </div>
                        <CurrentTimeLine />
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className="calendar-view">
                {this.weekView()}
            </div>
        )
    }
}


class CurrentTimeLine extends Component{
    constructor(props){
        super(props);
        this.state = {
            style:{
                top: "10%"
            }
        }

        //In Minutes
        this.range = [(this.props.start || 8) * 60, (this.props.end || 20) * 60];
        this.update = this.update.bind(this);
    }
    componentDidMount(){
        this.timerId = setInterval(this.update , 10000);
        this.update();
    }
    
    update(){
        let mins = this.range[1] - this.range[0];
        let d = new Date();
        let cTime = (d.getHours() * 60) + d.getMinutes();
        let perc = ((cTime - this.range[0]) / mins) * 100;

        this.setState({style:{
            top: perc + "%"
        }})
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    render(){
        return(
            <div className="current-time-line" style={this.state.style}><div className="dot"></div></div>
        )
    }
}

export class CalenderItem extends Component{
    render(){
        return(
            <div className="calender-item">Cal Item</div>
        )
    }
}