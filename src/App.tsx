interface Issue {
  id?: number,
  status : string,
  owner : string,
  effort? : number,
  created? : Date,
  due? : Date,
  issue_title : string
}


// Array de issues, simulando un fetch de una API o db
const initialIssues = [
  {
    id: 1, status: 'New', owner: 'Ravan', effort: 5,
    created: new Date('2018-08-15'), due: undefined,
    issue_title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
    created: new Date('2018-08-16'), due: new Date('2018-08-30'),
    issue_title: 'Missing bottom border on panel',
  },
  {
    id: 3, status: 'Ready', owner: 'Sofi', effort: 33,
    created: new Date('2023-09-27'), due: new Date('2023-10-30'),
    issue_title: 'Read all book in English',
  }
];


 // Definir props y state para cada componente
 type IssueFilterProps = {};

 type IssueFilterState = {};

class IssueFilter extends React.Component<{}, {}> {
  render() {
    return (
    <div>This is a placeholder for the issue filter.</div>
  );
  }
 }

 type IssueRowProps = {issue : Issue};

 type IssueRowState = {};

 function IssueRow(props: IssueRowProps, state : IssueRowState) {

  const issue = props.issue;

  console.log(`Rendering issue ${issue.id}`);
  return (
      <tr>
        <td> {issue.id} </td>
        <td> {issue.status} </td>
        <td> {issue.owner} </td>
        <td> { issue.created?.toDateString()} </td>
        <td> {issue.due ? issue.due.toDateString() : ''} </td>
        <td> {issue.issue_title} </td>
      </tr>
  );
 }

 type IssueTableProps = {
    issues : Issue[], 
    tableStyle : React.CSSProperties
  };

 type IssueTableState = {};

 function IssueTable (props : IssueTableProps, state : IssueTableState) {

  // Iterar con map en el array de issues del state, key para unique id de cada fila
  const issuesRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
  const tableStyle = props.tableStyle;

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
 
type IssueAddProps = { createIssue(issue : Issue) : void };

type IssueAddState = {};

class IssueAdd extends React.Component<IssueAddProps, IssueAddState> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event.currentTarget);

    const form  = document.forms.namedItem("IssueSubmit") as HTMLFormElement;
    //const form = event.currentTarget;

    let owner : string = form.owner?.value
    let title : string = form.issue_title?.value

    const issue : Issue = { owner : form.owner?.value , issue_title : form.issue_title?.value, status:"New"};
    this.props.createIssue(issue);
    form.owner.value = "";
    form.issue_title.value = "";

  }
  
  render() {
    return (
    <form name="IssueSubmit" onSubmit={this.handleSubmit}>
      <input type = "text" name="owner" placeholder="Owner" / >
      <input type = "text" name="issue_title" placeholder="Title" / >
      <button>Add</button>
    </form>
    );
  }
 }

 // clase que usa las otras 3 en un Fragment

type IssueListProps = {};

type IssueListState = {
  issues : Issue[]
};

 class IssueList extends React.Component<IssueListProps, IssueListState> { 
  constructor(props: any) {
    super(props);
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this); // para poder usarlo en child elements, y que this siga apuntando a IssueList
  }

  loadData() {
    setTimeout(() => {
      this.setState({issues : initialIssues});
    }, 1000);
  }

  createIssue(issue: Issue) {
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

    const tableStyle : React.CSSProperties = {marginLeft: "auto",  marginRight: "auto", borderCollapse: "collapse"};

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

 function IsFormFieldElement(element: Element): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
// Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    if (!("value" in element)) {
        throw new Error(`Element is not a form field element`);
    }
}

 // Crear issue list
ReactDOM.render(React.createElement(IssueList), document.getElementById('contents'));