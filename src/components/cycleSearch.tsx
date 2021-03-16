import React from 'react';
export const CycleSearch = (props: any) => {

    const {data} = props;
    const {searchTerm} = props;

    //The bike id is in the format BikePoints_# but only the # is displayed. 
    //parseBikeID returns just the number portion of the bike id
    function parseBikeID(value: any){
        return value.split("_")[1];
    };

    let dynamicSearch;
    const filteredData = React.useMemo(
        () =>
        data.filter((object: any) => object.commonName.toLowerCase().includes(searchTerm.toLowerCase())
        //parseBikeID prevents all results from populating when user types any letter combination of "bike" or "points" 
        || parseBikeID(object.id).toString().toLowerCase().includes(searchTerm.toLowerCase())
        || object.lat.toString().toLowerCase().includes(searchTerm.toLowerCase())
        || object.lon.toString().toLowerCase().includes(searchTerm.toLowerCase())),
        [searchTerm, data]
    );

    if (filteredData.length === 0){
        dynamicSearch = <p>No bike points found for "{searchTerm}."</p>
    } else {
        dynamicSearch =  filteredData.map((object: any)=> <p key={object.id}>{parseBikeID(object.id)} {object.commonName} ({object.lat}, {object.lat})</p>)
    }

    return (
        <div className="searchResults">{dynamicSearch}</div>
    );
}