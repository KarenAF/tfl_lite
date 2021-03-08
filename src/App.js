import './App.css';
import React, {Component } from 'react';
import { ReactTable } from "./components/reactTable";
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
         <div>
            <h1>Transport For London</h1>
            <ReactTable tableData = {this.state.response.data}/>
         </div>
    );
  }
}

export default App;
