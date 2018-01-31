import React, {Component} from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import './GridView.css';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

export default class GridView extends Component{

    constructor(props){
        super(props);
        
    }

    getWeekHeaderLayout(){
        let layout = [];
        for(let i=0; i < 7; i++){
            layout.push(<div key={"week-header-" + i} className="date-header" data-grid={{
                    x:(i * 2) + 1,
                    y:0,
                    w:2,
                    h:1
                }}>Day {i}</div>);
        }

        return layout;
    }

    getTimeMarginLayout(){
        let layout = [];
        for(let i=0; i < 8; i ++ ){
            layout.push(<div key={"time-margin-" + i} className="time-margin" data-grid={{
                    x:0,
                    y:(i * 2) + 1,
                    w:1,
                    h:2
                }}>{i + 8} AM</div>);
        }

        return layout;
    }

    getGridLayout(){
        let layout = [];

        for(let r=0; r < this.props.rows; r++){
            for(let c=0; c < this.props.cols; c++){
                let key = r + ',' + c;
                layout.push(<div key={key} className="main-grid" data-grid={{
                    x:(c * 2),
                    y:(r * 2),
                    w:2,
                    h:2
                }}>OO</div>);
            }
        }




        return layout;
    }

    getGridLayout2(){
        let layout = [];

        let items = this.props.items;

        if(!items)return;

        for(let i=0; i < items.length; i++){
            let item = items[i];
            layout.push(<div key={i} data-grid={{
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                    minW: item.minW,
                    maxW: item.maxW,
                    minH: item.minH,
                    maxH: item.maxH
                }}>{item.dom}</div>);
        }

        /*layout.push(<div key="itm1" className="calendarItem" data-grid={{
                    x:1,
                    y:1,
                    w:1,
                    h:2
                }}>OO</div>);

        
                layout.push(<div key="itm2" className="calendarItem" data-grid={{
                    x:3,
                    y:5,
                    w:1,
                    h:6
                }}>OO</div>);*/

        

        return layout;
    }

    drawPlainGrid(rows, cols){
        let grid = [];
        for(let r = 0; r < rows; r++){
            let cTemp = [];
            for(let c = 0 ; c < cols; c++){
                cTemp.push(<div key={r + ":" + c} row={r} col={c}></div>);
            }
            grid.push(<div>{cTemp}</div>)
        }

        return grid;
    }

    sanitizeClassName(cn){
        let className = this.props.className || "";
        if(cn){
            className = className + " " + cn;
        }
        
        className = className.split(' ');

        let ct = {};

        let sanitizedNames = [];

        for(let i=0; i < className.length; i++){
            if(!ct[className[i]]){
                sanitizedNames.push(className[i]);
            }
            ct[className[i]] = true;
        }

        return sanitizedNames.join(' ');
    }

    render(){        

        switch(this.props.mode){
            case 'react':
                let layout = this.getGridLayout2();
                return (                
                    <ReactGridLayout className={this.sanitizeClassName()} isDraggable={true} isResizable={true} cols={(this.props.cols)} rows={this.props.rows * 4} rowHeight={20} colWidth={127} autoSize={true} verticalCompact={false} preventCollision={false} margin={[0,0]}>
                        {layout}
                    </ReactGridLayout>                
                )
            break;
            default:
                return (
                    
                    <div className={this.sanitizeClassName("table layout-fixed hmax vmax grid-view")}>{this.drawPlainGrid(this.props.rows, this.props.cols)}</div>
                );
            break;
        }

        

        

        /*return(
            <div className={"grid-view table"}>{this.grid}</div>
        )*/
    }
}