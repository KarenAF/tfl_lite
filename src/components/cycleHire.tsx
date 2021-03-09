import { useState } from 'react';
import { CycleSearch } from './cycleSearch'

export const CycleHire = (props: any) => {
  //useState hook to change searchTerm
  const [searchTerm, setSearchTerm] = useState("");
  const data = props.bikeData.data ?? [];
  
  function editSearchTerm(e: any){
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
          <CycleSearch key="cycleSearchKey" data = {data} searchTerm = {searchTerm} />
        </div>
      </div>
  );
}
