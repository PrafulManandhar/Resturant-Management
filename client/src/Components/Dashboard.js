import React, { Component } from 'react';
import Navbars from './Navbar';
import DailyReport from './DailyReport'
export default class Dashboard extends Component {
  render() {
    return (
      <div> <Navbars/> 
        <DailyReport/>
        </div>
    );
  }
}
