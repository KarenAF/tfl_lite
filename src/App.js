import './App.css';
import React, {Component } from 'react';
import { ReactTable } from "./components/reactTable";
import { Cycle } from "./components/cycle";
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  };

  async componentDidMount(){
  var tflAPI = 'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true';
  // Make data request
  const response = await axios.get(tflAPI)

  // Update state with line data
  this.setState({
    response,
    isLoading: false
  });
  //End of setState
  }

render(){
  console.log(this.state);
  if(this.state.isLoading){
    return (
      <div><p>loading</p></div>
    );
  } else
    return (
         <div id="wrapper">
           <div>
            <h1 id="header">TFL (Transport For London) Service Status</h1>
            <ReactTable tableData = {this.state.response.data}/>
          </div>
          <Cycle/>
         </div>
    );
  }
}

export default App;
