class IssueFilter extends React.Component {
  render() {
    return (
    <div>This is a placeholder for the issue filter.</div>
  );
  }
 }

 class IssueRow extends React.Component {
  render() {

    const style = this.props.rowStyle;

    return (
      <tr>
        <td style={style}> {this.props.issue_id} </td>
        <td style={style}> {this.props.issue_title} </td>
      </tr>
    );
  }
 }

 class IssueTable extends React.Component {
  render() {

    const myStyle = this.props.tableStyle;

    const rowStyle = {
      border: "1px solid orange",
      padding: 4
    }


  return (
    <table style={myStyle}>
      <thead>
        <tr>
          <th style={rowStyle}>ID</th>
          <th style={rowStyle}>Title</th>
        </tr>
      </thead>
      <tbody>
        <IssueRow rowStyle={rowStyle} issue_id={1} issue_title={"Error in console when clicking Add"} />
        <IssueRow rowStyle={rowStyle} issue_id={2} issue_title={"Missing bottom border on right panel"} />
      </tbody>
    </table>
  );
  }
 }
 
 class IssueAdd extends React.Component {
  render() {
  return (
  <div>This is a placeholder for a form to add an issue.</div>
  );
  }
 }

 // clase que usa las otras 3 en un Fragment
 class IssueList extends React.Component { 
  render() {

     const tableStyle = {
      marginLeft: "auto",
      marginRight: "auto",
      borderCollapse: "collapse"
    }

  return (
  <React.Fragment>
    <h1>Issue Tracker</h1>
    <IssueFilter />
    <hr />
    <IssueTable tableStyle={tableStyle} />
      <hr />
    <IssueAdd />
  </React.Fragment>
  );
  }
 }

 // Crear issue list
const element = <IssueList  / >;

ReactDOM.render(element, document.getElementById('contents'));