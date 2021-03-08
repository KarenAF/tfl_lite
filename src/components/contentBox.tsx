export const ContentBox = (props: any) => {
    const { lineStatuses, lineName } = props; 
    const Disruptions = (lineStatuses ?? []).filter((object:any) => object.statusSeverity !== 10);
    const hasDisruption = Disruptions.length > 0;
    const contentLineName = lineName + ': ';
    const disruptionHeader = hasDisruption ? 'Service Currently Suffering Disruptions' : 'No Service Disruption.';
    const disruptionFooter = hasDisruption ? 'We appreciate your patience as our team works diligently to restore service to normal.' : 'Thank you for using TFL. Cheerio!';
    const disruptionDetails = hasDisruption ? Disruptions.map((Disruption: any) => {
        return <li> {Disruption.validityPeriods[0].fromDate + ': ' + Disruption.reason} </li>;
    }) : [];
    return (
        <div id="content">
        <div className={lineName.split(" ")[0]} >
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