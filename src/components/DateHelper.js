import React from 'react';

export default class DateHelper{
    constructor(date){
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

        this.date = date || new Date();

    }
    getWeekRange(fromDate){
        let today = fromDate || this.date;
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
        let weekEnd = this.getWeekRange(this.date)[1];
        weekEnd.setDate(weekEnd.getDate() + 1);
        this.date = weekEnd;
        return weekEnd;
    }

    gotoPrevWeek(){
        let weekStart = this.getWeekRange(this.date)[0];
        weekStart.setDate(weekStart.getDate() - 1);
        this.date = weekStart;
        return weekStart;
    }

}