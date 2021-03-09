import { useState } from 'react';

export const CycleHire = (props: any) => {
  //useState hook to change searchTerm
  const [searchTerm, setSearchTerm] = useState("");
  const data = props.bikeData.data ?? [];
  
  function editSearchTerm(e: any){
    setSearchTerm(e.target.value);
  };

  function dynamicSearch() {
    const filteredData = data.filter((object: any) => object.commonName.toLowerCase().includes(searchTerm.toLowerCase()) 
    || object.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    || object.lat.toString().toLowerCase().includes(searchTerm.toLowerCase())
    || object.lon.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    return filteredData.map((object: any)=> <p>{object.id.split("_")[1]} {object.commonName} ({object.lat}, {object.lat})</p>)
  };

  return (
      <div className="bikePanel">
        <div>
        <h3 className="searchBar">Enter search value:</h3>
          <input className="inputBar" type="text" value={searchTerm} onChange={editSearchTerm} placeholder='Search TFL for available cycles for hire'/>
        </div>
        <div className="bikeContent">
          <br/>
          <b>Search results:</b>
          <br/>
          <br/>
          {dynamicSearch()}
        </div>
      </div>
  );
}
