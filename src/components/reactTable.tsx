import { useState } from 'react';
import { useTable } from 'react-table';
import { ContentBox } from './contentBox';

const columns = [
  {
    Header: "Line",
    accessor: "name",
    //Destructure args for columns Cell to extract relevant Line data
    Cell: ({value, row}: {value:any, row:any}) => {
      return(
        <div>
          {value} 
          {" "}
          {row.original.serviceTypes.some((timeOfDay: any) => timeOfDay.name === "Night") ? "☾ " : ""} 
          {" "}
          {row.original.lineStatuses.some((badStatus: any) => badStatus.statusSeverity !== 10) ? "⚠ " :""}
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
    //useState hook to change the currentLineStatuses using setCurrentLineStatuses callback
    const [currentLineStatuses, setCurrentLineStatuses] = useState(null);
    const data = props.tableData;

    function getDisruptions(index: number){
      console.log('get disruptions was called')
      setCurrentLineStatuses(data[index].lineStatuses);
    };


    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns: columns as any,
      data: data as any,
    });

    return (
      <div className="flex-container" id="wrapper">
        <div id="menu">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr  className="tableHeaderStyle" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
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
       {currentLineStatuses && <ContentBox lineStatuses = {currentLineStatuses}/>}
      </div>
    );
}
