export const ContentBox = (props: any) => {
    const { lineStatuses } = props; 
    const Disruptions = (lineStatuses ?? []).filter((object:any) => object.statusSeverity != 10);
    const hasDisruption = Disruptions.length > 0;
    const disruptionHeader = hasDisruption ? 'Service Currently Suffering Disruptions' : "No Service Disruption";
    const disruptionDetails = hasDisruption ? Disruptions.map((Disruption: any) => {
        return <li> {Disruption.validityPeriods[0].fromDate + ': ' + Disruption.reason} </li>;
    }) : [];
    return (
        <div id="content">
          <h1>{disruptionHeader}</h1>
          <ul>{disruptionDetails}</ul>
        </div>
    );
}