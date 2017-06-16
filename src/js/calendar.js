import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { DayPicker, isSameDay } from 'react-dates';
import includes from 'array-includes';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDate: null,
      selectedDate: null,
      store: props.store
    };

    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleDayMouseLeave = this.handleDayMouseLeave.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleRenderDay = this.handleRenderDay.bind(this);
    this.handlerRenderMonth = this.handlerRenderMonth.bind(this);
    this.renderCalendarInfo = this.renderCalendarInfo.bind(this);
  }

  renderCalendarInfo(info) {
  	console.log(info);
  }

  handlerRenderMonth(month){
  }

  handleRenderDay(day){
  	var objDay;
  	this.state.store.forEach(function(o) {
  		var m = moment().year(o.year).month(o.month).date(o.day);
  		if (day.format('L') === m.format('L')) {
        objDay = {
          fee_pattern_no: o.fee_pattern_no,
          status: o.status
        };
  			return;
  		}
  	});

    if(objDay) {
      return (
        <div>
          <div className='row'>
            <span>{day.format('D')}</span>
          </div>
          <div className='row'>
            <span className={"icon_" + objDay.status}></span>
          </div>
          <div className='row'>
            <NumberFormat 
              value={objDay.fee_pattern_no} 
              displayType={'text'} 
              thousandSeparator={true} />
          </div>
        </div>
      );
    }

    return (
      <span>{day.format('D')}</span>
    );
  }

  handleDayMouseEnter(day) {
    this.setState({
      hoverDate: day,
    });
  }

  handleDayMouseLeave() {
    this.setState({
      hoverDate: null,
    });
  }

  handleDayClick(day, modifiers, e) {
    if (includes(modifiers, 'blocked')) return;

    this.setState({
      selectedDate: day,
    });
  }

  isBlocked(day) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day);
  }

  isSelectedDate(day) {
    return isSameDay(day, this.state.selectedDate);
  }

  isHovered(day) {
    return isSameDay(day, this.state.hoverDate);
  }

  render() {
    const {
      isDayBlocked,
      isOutsideRange,
    } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => isDayBlocked(day),
      'blocked-out-of-range': day => isOutsideRange(day),
      valid: day => !this.isBlocked(day),
      hovered: day => this.isHovered(day),
      selected: day => this.isSelected(day),
    };

    return (
      <DayPicker
        ref="DayPicker"
        modifiers={modifiers}
        onDayMouseEnter={this.handleMouseEnter}
        onDayMouseLeave={this.handleMouseLeave}
        onDayClick={this.handleDayClick}
        renderDay={this.handleRenderDay}
        daySize={60}
        numberOfMonths={2}
        hideKeyboardShortcutsPanel={true}
        renderDay={this.handleRenderDay}
      />
    );
  }
}