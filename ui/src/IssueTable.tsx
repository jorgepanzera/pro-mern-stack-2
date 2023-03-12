import { IssueRow } from "./Issuerow"
import Issue from "./types/IssueInterface"

export type IssueTableProps = {
    issues: Issue[]
    tableStyle: React.CSSProperties
    tableClass: string
}

export type IssueTableState = {}

export function IssueTable(props: IssueTableProps, state: IssueTableState) {
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