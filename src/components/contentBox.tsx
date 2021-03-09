export function getDynamicCSS(name: string){
    return name.split(" ")[0];
};

export const ContentBox = (props: any) => {
    const { lineStatuses, lineName } = props; 
    const disruptions = (lineStatuses ?? []).filter((object:any) => object.statusSeverity !== 10);
    const hasDisruption = disruptions.length > 0;
    const contentLineName = lineName + ': ';
    const disruptionHeader = hasDisruption ? 'Service Currently Suffering Disruptions' : 'No Service Disruption.';
    const disruptionFooter = hasDisruption ? 'We appreciate your patience as our team works diligently to restore service to normal.' : 'Thank you for using TFL. Cheerio!';
    
    const disruptionDetails = hasDisruption ? disruptions.map((disruption: any) => {
        return <li> {disruption.validityPeriods[0].fromDate + ': ' + disruption.reason} </li>;
    }) : [];

    return (
        <div id="content">
        <div className={getDynamicCSS(lineName)}>
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