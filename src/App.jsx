// Array de issues, simulando un fetch de una API o db
const initialIssues = [
  {
    id: 1, status: 'New', owner: 'Ravan', effort: 5,
    created: new Date('2018-08-15'), due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
    created: new Date('2018-08-16'), due: new Date('2018-08-30'),
    title: 'Missing bottom border on panel',
  },
  {
    id: 3, status: 'Ready', owner: 'Sofi', effort: 33,
    created: new Date('2023-09-27'), due: new Date('2023-10-30'),
    title: 'Read all book in English',
  }
];

const sampleIssue = {
  status: 'New', owner: 'Pieta',
  title: 'Add new issue using timer',
 };

 const otherIssue = {
  status: 'New', owner: 'Pepe',
  title: 'Add new issue using timer 2',
 };

class IssueFilter extends React.Component {
  render() {
    return (
    <div>This is a placeholder for the issue filter.</div>
  );
  }
 }

 class IssueRow extends React.Component {
  constructor() {
    super();
  }

  render() {

    const issue = this.props.issue;

    console.log(`Rendering issue ${issue.id}`);
    return (
      <tr>
        <td> {issue.id} </td>
        <td> {issue.status} </td>
        <td> {issue.owner} </td>
        <td> {issue.created.toDateString()} </td>
        <td> {issue.due ? issue.due.toDateString() : ''} </td>
        <td> {issue.title} </td>
      </tr>
    );
  }
 }


 class IssueTable extends React.Component {
  constructor() {
    super();
  }


  render() {

    // Iterar con map en el array de issues del state, key para unique id de cada fila
    const issuesRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
    const tableStyle = this.props.tableStyle;

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th >ID</th>
          <th >Status</th>
          <th >Owner</th>
          <th >Created Date</th>
          <th >Due Date</th>
          <th >Title</th>
        </tr>
      </thead>
      <tbody>
        {issuesRows}
      </tbody>
    </table>
  );
  }
 }
 
 class IssueAdd extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  handleSubmit(event) {
    event.preventDefault();

    const form = document.forms.IssueAdd;
    

  }
  
  render() {
    return (
    <form name="IssueSubmit" onSubmit={this.handleSubmit}>
      <input type = "text" name="owner" placeholder="Owner" / >
      <input type = "text" name="title" placeholder="Title" / >
      <button>Add</button>
    </form>
    );
  }
 }

 // clase que usa las otras 3 en un Fragment
 class IssueList extends React.Component { 
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this); // para poder usarlo en child elements, y que this siga apuntando a IssueList
  }

  loadData() {
    setTimeout(() => {
      this.setState({issues : initialIssues});
    }, 1000);
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });
  }

  // cuando el componente esta pronto para render, le asigno el state inicial
  componentDidMount() {
    this.loadData();
  }

  render() {

    const tableStyle = {marginLeft: "auto",  marginRight: "auto", borderCollapse: "collapse"};

  return (
  <React.Fragment>
    <h1>Issue Tracker</h1>
    <IssueFilter />
    <hr />
    <IssueTable issues={this.state.issues} tableStyle={tableStyle} />
      <hr />
    <IssueAdd createIssue={this.createIssue} />
  </React.Fragment>
  );
  }
 }

 // Crear issue list
const element = <IssueList  / >;

ReactDOM.render(element, document.getElementById('contents'));