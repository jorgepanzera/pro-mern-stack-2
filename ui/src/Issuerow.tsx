import Issue from './types/IssueInterface'

type IssueRowProps = { issue: Issue }

type IssueRowState = {}

export function IssueRow(props: IssueRowProps, state: IssueRowState) {
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
