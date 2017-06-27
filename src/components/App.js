import React, { Component } from 'react';
import './App.css';
import {getCustomerList} from '../customers';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
    this.startNewCustomer = this.startNewCustomer.bind(this)
  }

  componentDidMount() {
    getCustomerList().then(res => {
      this.setState({
        customerList: res
      })
    })
  }

  startNewCustomer() {
    this.setState({
      creating: true
      ,initialLoad: false
      ,currentCustomer: null
    })
  }

  render() {
    var {startNewCustomer} = this.props;

    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              startNewCustomer={this.startNewCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                  />
        </div>
      </div>
    )
  }
}

export default App;
