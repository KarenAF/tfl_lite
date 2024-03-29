import { useState } from 'react';
import { useTable } from 'react-table';
import { ContentBox, getDynamicCSS } from './contentBox';

// columns defined outside of export function to prevent react-table from calling it infinitely and crashing.
const columns = [
  {
    Header: "Line",
    accessor: "name",
    //Destructure args for columns Cell to extract relevant Line data
    Cell: ({value, row}: {value:any, row:any}) => {
      return(
          <div className={getDynamicCSS(value)} id="lineName">
            {" "}
            {value} 
            {" "}
            {row.original.serviceTypes.some((timeOfDay: any) => timeOfDay.name === "Night") ? "  ☾ " : " "} 
            {" "}
            {row.original.lineStatuses.some((badStatus: any) => badStatus.statusSeverity !== 10) ? "⚠ " : " "}
          </div>
      )
    }
  },
  {
    Header: "Mode",
    accessor: "modeName",
  }
];


export const ReactTable = (props: any) => {
    //useState hook to change currentLineStatuses using setCurrentLineStatuses callback; for conditional rendering
    const [currentLineStatuses, setCurrentLineStatuses] = useState(null);
    const [currentLineName, setCurrentLineName] = useState(null);
    //use localeCompare and arrow function (es6) with sort to order rows by mode(i.e. modeName) then line(i.e. name).
    const data = props.tableData.sort((a: any, b: any) => a.modeName.localeCompare(b.modeName) || a.name - b.name);

    function getDisruptions(index: number){
      setCurrentLineStatuses(data[index].lineStatuses);
      setCurrentLineName(data[index].name);
    };

    function introMessage(){
      return <h3 className="contentHeader">Click on a line to see status details</h3>;
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      // React-table @types file is out of sync with React-table usage.
      columns: columns as any,
      data: data as any,
    });

    return (
      <div className="flex-container" id="wrapper">
        <div id="menu">
          <table {...getTableProps()}>
            <thead>
              {/* react-table syntax gathers the information for the columns here*/}
              {headerGroups.map((headerGroup) => (
                <tr  className="tableHeaderStyle" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* react-table syntax gathers the information for the cells here*/}
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                // eslint-disable-next-line no-lone-blocks
                {/* getDisruptions is invoked during the row loop, and passed the current index so that the ContentBox component
                receives the currently iterated lineName, in order to display the service status for the selected line.*/}
                return (
                  <tr {...row.getRowProps()} onClick={() => getDisruptions(i)}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* The ContentBox component is mounted only if the user has clicked on a line (i.e. currentLineStatuses is set in state.
          If the user hasn't clicked anything yet upon page load, the introMessage is shown, to instruct the user on what to do to get started.
          The ContentBox component is passed the list of line disruptions that have already been filtered by the clicked line name,
          and it is also separately passed name of the line that has been clicked, via the props, because the lineName does not exist in the lineStatuses object.*/}
       {currentLineStatuses ? <ContentBox key="contentBoxKey" lineStatuses = {currentLineStatuses!} lineName = {currentLineName!}/> : introMessage()}
      </div>
    );
}
