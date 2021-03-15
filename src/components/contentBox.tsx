export function getDynamicCSS(name: string){
    return name.split(" ")[0];
};

type LineStatus = {
  type: string,
  created: Date,
  disruption?: any,
  id: number,
  lineId?: string,
  reason?: string,
  statusSeverity: number,
  statusSeverityDescription: string,
  validityPeriods: Array<{
    type: string,
    fromDate: Date,
    isNow: boolean,
    toDate: Date
  }>
}

type Props = {
  lineStatuses: Array<LineStatus>,
  lineName?: string
}

// The ContentBox component receives the lineStatuses data from the ReactTable component, already filtered by user-selected line name. 
// The ContentBox component only handles the logic for finding the line statuses with disruptions.
// It then decides what info to display based on whether it has found service disruptions.
export const ContentBox = ({lineStatuses, lineName}: Props) => {
    const disruptions = (lineStatuses ?? []).filter((object:LineStatus) => object.statusSeverity !== 10);
    const hasDisruption = disruptions.length > 0;
    const contentLineName = lineName + ': ';
    const disruptionHeader = hasDisruption ? 'Service Currently Suffering Disruptions' : 'No Service Disruption.';
    const disruptionFooter = hasDisruption ? 'We appreciate your patience as our team works diligently to restore service to normal.' : 'Thank you for using TFL. Cheerio!';
    
    const disruptionDetails = hasDisruption ? disruptions.map((disruption: any) => {
        return <li> {disruption.validityPeriods[0].fromDate + ': ' + disruption.reason} </li>;
    }) : [];

    return (
        <div id="content">
        {/*lineName will never be null or undefined; non-null assertion operator (!) tells TS that lineName is not null, though it can appear to be. */}
        <div className={getDynamicCSS(lineName!)}>
          <h2 className="contentHeader"> {" "} {contentLineName}</h2>
        </div>
          <h3 className="contentHeader">{disruptionHeader}</h3>
          <ul>{disruptionDetails}</ul>
          <div>
             <ul className="contentFooter">{disruptionFooter}</ul>
          </div>
        </div>
    );
}