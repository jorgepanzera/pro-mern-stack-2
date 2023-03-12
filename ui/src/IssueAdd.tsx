import React from "react"
import Issue from "./types/IssueInterface"

// explicitar el contenido de Props y State para IssueAddState
export type IssueAddProps = { createIssue(issue: Issue): void }

export type IssueAddState = {}

export class IssueAdd extends React.Component<IssueAddProps, IssueAddState> {
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