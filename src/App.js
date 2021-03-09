import './App.css';
import React, {Component } from 'react';
import { ReactTable } from "./components/reactTable";
import { CycleHire } from "./components/cycleHire";
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  };

  async componentDidMount(){
    // Define TFL API requests
    try {
      var tflAPI = 'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true';
      var tflBikeAPI = 'https://api.tfl.gov.uk/BikePoint/Search?query=regent';
      // Make data request
      const lineResponse = await axios.get(tflAPI)
      const bikeResponse = await axios.get(tflBikeAPI)
      if (lineResponse.status >= 400){
        throw new Error("something went wrong");
        // Update state with line data
      }
      this.setState({
        lineResponse,
        bikeResponse,
        isLoading: false
      });
    } catch (err) {
      console.error(err);
    };
    

  }

render(){
  if(this.state.isLoading){
    return (
      <div>
        <span><p>loading</p></span>
        <img src="boris-riding.png" alt="Boris on a bike"/>
      </div>
    );
  } else
    // Pass the data from the two API requests to ReactTable CycleHire components respectively via props.
    return (
         <div id="wrapper" style={{ backgroundImage: "url(/TFL-bg-white.png)" }}>
           <div>
            <img className="img" src="TFL-logo.png" alt="TFL Logo"/>
            <h1 id="header">TFL (Transport For London) Service Status</h1>
            <ReactTable tableData = {this.state.lineResponse.data}/>
          </div>
            <img className="img" src="cycle-hire-logo.png" alt="Cycle Hire Logo"/>
            <h1 id="footer"> Cycle Hire </h1>
          <CycleHire bikeData = {this.state.bikeResponse}/>
         </div>
    );
  }
}

export default App;
