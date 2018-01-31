import React, {Component} from 'react';
import './DateSelectorView.css';
import leftArrow from '../images/arrow-left.png';
import rightArrow from '../images/arrow-right.png';

export default class DateSelectorView extends Component{
    constructor(props){
        super(props);
        this.monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        this.dayNames = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];

        this.state = {date:props.date};

        this.gotoNextWeek = this.gotoNextWeek.bind(this);
        this.gotoPrevWeek = this.gotoPrevWeek.bind(this);
    }
    getWeekRange(fromDate){
        let today = fromDate || new Date();
        let weekStart = new Date(today.getTime());
        let weekEnd = new Date(today.getTime());

        weekStart.setDate(weekStart.getDate() - today.getDay());
        weekEnd.setDate(weekStart.getDate() + 6);

        return [weekStart, weekEnd];

        //this.setState({weekRange:});
    }

    rangeToString(dateRange){
        let depth = 0;
        let endOrder = ['d', 'y'];
        let startOrder = ['m', 'd'];

        if(dateRange[0].getMonth() != dateRange[1].getMonth()){
            depth = 1;
            endOrder = ['m', 'd', 'y'];
        }

        if(dateRange[0].getYear() != dateRange[1].getYear()){
            endOrder = ['m', 'd', 'y'];
            startOrder = ['m', 'd', 'y'];
        }

        


        let start = this.dateToString(dateRange[0], 3, startOrder);
        let end = this.dateToString(dateRange[1], 3, endOrder);

        return start + " - " + end ;
    }

    dateToString(d, depth, order){
        //depth day(0), month(1), year(2);
        let depthOrder = ['d', 'm', 'y'];
        let odr = order || ['m', 'd', 'y'];
        let dpth = depth || odr.length;



        let s = [];
        for(let i=0; i < dpth; i++){
            let p = odr[i];
            if(p){
                switch(p){
                    case 'm':
                        s.push(this.monthNames[d.getMonth()] + ' ');
                    break;
                    case 'd':
                        s.push(d.getDate());
                    break;
                    case 'y':
                        s.push(', ' + d.getFullYear());
                    break;
                }
            }else{
                break;
            }
        }

        return s.join('');
    }

    gotoNextWeek(){
        let weekEnd = this.getWeekRange(this.state.date)[1];
        weekEnd.setDate(weekEnd.getDate() + 1);

        this.setState({date: weekEnd});
    }

    gotoPrevWeek(){
        let weekStart = this.getWeekRange(this.state.date)[0];
        weekStart.setDate(weekStart.getDate() - 1);

        this.setState({date: weekStart});
    }

    render(){
        let weekRange = this.getWeekRange(this.state.date);

        return(
            <div className="date-selector-view">
                <span className="date-display">{this.rangeToString(weekRange)}</span>
                <img src={leftArrow} onClick={this.gotoPrevWeek} className="arrow" /> <img src={rightArrow} onClick={this.gotoNextWeek} className="arrow" />
            </div>
        )
    }
}