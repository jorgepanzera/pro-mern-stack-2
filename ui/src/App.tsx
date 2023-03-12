
import React from "react"
import ReactDOM from "react-dom"
import { jsonDateReviver } from "./DateHandler"
import {Issue} from "./types/IssueInterface"
import { IssueFilter } from "./IssueFilter"


// obtener variable de entorno para la API URL, es a traves del env.js (en index.hmtl)
// que arma en runtime el  uiserver.ts con el metodo get
const API_URL = window.ENV.UI_API_ENDPOINT

console.log(`${API_URL}/issues`)



type IssueRowProps = { issue: Issue }

type IssueRowState = {}

function IssueRow(props: IssueRowProps, state: IssueRowState) {
    const issue = props.issue

    console.log(`Rendering issue ${issue.id}`)
    return (
        <tr>
            <td> {issue.id} </td>
            <td> {issue.status} </td>
            <td> {issue.owner} </td>
            <td> {issue.created?.toDateString()} </td>
            <td> {issue.due ? issue.due.toDateString() : ''} </td>
            <td> {issue.issue_title} </td>
        </tr>
    )
}

type IssueTableProps = {
    issues: Issue[]
    tableStyle: React.CSSProperties
    tableClass: string
}

type IssueTableState = {}

function IssueTable(props: IssueTableProps, state: IssueTableState) {
    // Iterar con map en el array de issues del state, key para unique id de cada fila
    //console.log(props.issues);
    const issuesRows = props.issues.map((issue) => <IssueRow key={issue.id} issue={issue} />)
    const tableStyle = props.tableStyle
    const tableClass = props.tableClass

    return (
        <table className={tableClass} style={tableStyle}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created Date</th>
                    <th>Due Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>{issuesRows}</tbody>
        </table>
    )
}

// explicitar el contenido de Props y State para IssueAddState
type IssueAddProps = { createIssue(issue: Issue): void }

type IssueAddState = {}

class IssueAdd extends React.Component<IssueAddProps, IssueAddState> {
    constructor(props: any) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {}

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        //console.log(event.currentTarget);

        const form = document.forms.namedItem('IssueSubmit') as HTMLFormElement
        //const form = event.currentTarget;

        let owner: string = form.owner?.value
        let title: string = form.issue_title?.value

        const issue: Issue = {
            owner: form.owner?.value,
            issue_title: form.issue_title?.value,
            status: 'New',
        }
        this.props.createIssue(issue)
        form.owner.value = ''
        form.issue_title.value = ''
    }

    render() {
        return (
            <form name="IssueSubmit" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="issue_title" placeholder="Title" />
                <button>Add</button>
            </form>
        )
    }
}

// clase que usa las otras 3 en un Fragment

type IssueListProps = {}

type IssueListState = {
    issues: Issue[]
}

class IssueList extends React.Component<IssueListProps, IssueListState> {
    constructor(props: any) {
        super(props)
        this.state = { issues: [] }
        this.createIssue = this.createIssue.bind(this) // para poder usarlo en child elements, y que this siga apuntando a IssueList
    }

    /*
  async loadData() {
    // Aca va el fetch a la api GET ALL cuando exista
    try {
      const data = await request("http://localhost:3000/issues", {
        method: "GET",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
      });

      if (data) {
        this.setState({ issues: data as Issue[] });
      }
    } catch (error) {
      console.log(error);
    }
  }*/

    async loadData() {
        let requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow',
        }

        // consumir la api utilizando la libreria fetch
        try {
            let response = await fetch(`${API_URL}/issues`, requestOptions)
            let body = await response.text()
            //console.log(body);
            let result = JSON.parse(body, jsonDateReviver)
            //console.log(result);
            if (result) {
                this.setState({ issues: result?.issues as Issue[] })
            }
            /*
     let data = await request("http://localhost:3000/issues", requestOptions)
      if (data) {
        //this.setState({ issues: result?.issues as Issue[] });
        this.setState({ issues: data?.issues as Issue[] });
      }
      */
        } catch (err) {
            throw new Error(`Error loadData/GetAllIssues : ${err}`)
        }
    }

    async createIssue(issue: Issue) {
        /*
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });
    */
        let requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issue),
        }
        try {
            let response = await fetch(`${API_URL}/issue/create`, requestOptions)
            let body = await response.text()
            console.log(body)
            let result = JSON.parse(body, jsonDateReviver)
            console.log(result)
            if (result) {
                await this.loadData()
            }
        } catch (err) {
            throw new Error(`Error createIssue : ${err}`)
        }
    }

    // cuando el componente esta pronto para render, le asigno el state inicial
    componentDidMount() {
        this.loadData()
    }

    render() {
        const tableStyle: React.CSSProperties = {}
        /*marginLeft: "auto",
      marginRight: "auto",
      borderCollapse: "collapse",
    };*/
        // w-75 es 75% de tamanio relativo al parent, mx-auto la centra
        const tableClass = 'table table-dark table-striped table-responsive w-75 mx-auto'

        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable
                    issues={this.state.issues}
                    tableStyle={tableStyle}
                    tableClass={tableClass}
                />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        )
    }
}

function IsFormFieldElement(
    element: Element
): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
    // Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    if (!('value' in element)) {
        throw new Error(`Element is not a form field element`)
    }
}

async function request<TResponse>(request_url: string, config: RequestInit): Promise<TResponse> {
    const response = await fetch(request_url, config)

    const body = await response.text()
    const result = JSON.parse(body, jsonDateReviver)
    return result
}

/*
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}
*/

// Crear issue list
ReactDOM.render(React.createElement(IssueList), document.getElementById('contents'))
