'use strict'
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import ReactDOM from 'react-dom';

const mapStateToProps = (state) => {
    return {
        // count: state.factorylist.count,
        // factorylist: state.factorylist.list,
    }
}
      
const Demo = React.createClass({
    getInitialState() {
        return {
            tabTitle: '工厂数据管理',
            files:'',
            filename: '',
            psn: '',
            imei: '',
            startDate: '',
            endDate: '',
            page: 1,
            pageSize: 10,
        }
    },

    componentDidMount() {
        // this.getFactoryList();
    },


    handleDateChange(name,date){
        if(name){
            let searchdata={};
            let newdate = date;
            if(date==null){
                   newdate = '';
            }else{
                  newdate=moment(date).format('YYYY-MM-DD'); 
            }
           
            searchdata[name]=newdate; 
            this.setState(searchdata)
        }
    },
  
    render() {

   
      const calendar = (<Calendar
                showDateInput={true}
                dateInputPlaceholder="please input"
                style={{top:'-5px'}}
                />);
        return (
        <div className="factory-conten form-inline" style={{margin: 150}}>
               <span>日期：</span>
                <DatePicker
                          animation="slide-up"
                          disabled={this.state.disabledend}
                          calendar={calendar}
                          onChange={this.handleDateChange.bind(this,'endDate')}
                        >
                          {
                            ({ value }) => {

                              return (
                              
                                <input className="form-control"
                                  style={{ width: 250 }}
                                  disabled={this.state.disabledend}
                                  className="form-control"
                                  value={this.state.endDate!==''?moment(this.state.endDate).format('YYYY/MM/DD'):null}
                                  onChange={this.handleDateChange}
                                />
                                
                              );
                            }
                          }
                </DatePicker>

           
        </div>)
    }
});

export default connect(mapStateToProps)(Demo);
