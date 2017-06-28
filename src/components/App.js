

import React, { Component } from 'react';
import './App.css';
import {getCustomerList, postCustomer, getCustomer, updateCustomer, deleteCustomer} from '../customers';

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
    this.createCustomer = this.createCustomer.bind(this)
    this.selectCustomer = this.selectCustomer.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.removeCustomer = this.removeCustomer.bind(this)
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

  createCustomer(customerObj) {
    postCustomer(customerObj).then(response => {
      getCustomerList().then(list => {
        this.setState({
          customerList: list
          ,initialLoad: true
          ,creating: true
        })
      })
    })
  }

  selectCustomer(id) {
    getCustomer(id).then(res => {
      this.setState({
        currentCustomer: res
        ,initialLoad: false
      })
    })
  }

  saveEdit(id, customer) {
    updateCustomer(id, customer).then(list => {
      getCustomerList().then(() => {
        this.setState({
          customerList: list
          ,currentCustomer: customer
        })
      })
    })
  }

  removeCustomer(id) {
    deleteCustomer(id);
  }

  render() {
    // var {startNewCustomer} = this.props;

    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              startNewCustomer={this.startNewCustomer}
              selectCustomer={this.selectCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                    saveEdit={this.saveEdit}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
