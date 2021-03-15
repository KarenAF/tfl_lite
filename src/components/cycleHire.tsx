import { useState } from 'react';
import { CycleSearch } from './cycleSearch'

type Props = {
  bikeData: Array<{
    type: string,
    additionalProperties: [],
    children: [],
    childrenURLs: [],
    commonName: string,
    id: string,
    lat: number,
    lon: number,
    placeType: string,
    url: string
  }>
}

export const CycleHire = ({bikeData}: Props) => {
  //useState hook to change searchTerm
  const [searchTerm, setSearchTerm] = useState("");
  
  function editSearchTerm(e: React.ChangeEvent<HTMLInputElement>){
    setSearchTerm(e.target.value);
  };

  return (
      <div className="bikePanel">
        <div>
        <h3 className="searchBar">Enter search value:</h3>
          <input className="inputBar" type="text" value={searchTerm} onChange={editSearchTerm} placeholder='Search TFL for available cycles for hire'/>
          <img className="img2" src="boris-bike.png" alt="bike hire"/>
        </div>
        <div className="bikeContent">
          <br/>
          <b>Search results:</b>
          <br/>
          <br/>
          {/* The CycleHire component passes the search term and data from the app.js axios call 
          to the CycleSearch component to handle the logic for filtering the data against the seach term. */}
          <CycleSearch key="cycleSearchKey" data = {bikeData} searchTerm = {searchTerm} />
        </div>
      </div>
  );
}
