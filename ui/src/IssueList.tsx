// obtener variable de entorno para la API URL, es a traves del env.js (en index.hmtl)

import React from 'react'
import { jsonDateReviver } from './DateHandler'
import { IssueAdd } from './IssueAdd'
import { IssueFilter } from './IssueFilter'
import { IssueTable } from './IssueTable'
import Issue from './types/IssueInterface'

// que arma en runtime el  uiserver.ts con el metodo get
const API_URL = window.ENV.UI_API_ENDPOINT

// clase que usa las otras 3 en un Fragment

export type IssueListProps = {}

export type IssueListState = {
    issues: Issue[]
}

export class IssueList extends React.Component<IssueListProps, IssueListState> {
    constructor(props: any) {
        super(props)
        this.state = { issues: [] }
        this.createIssue = this.createIssue.bind(this) // para poder usarlo en child elements, y que this siga apuntando a IssueList
    }

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
