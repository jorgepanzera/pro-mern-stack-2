export interface Issue {
    id?: number
    status: string
    owner: string
    effort?: number
    created?: Date
    due?: Date
    issue_title: string
}


// Array de issues, simulando un fetch de una API o db
/*
const initialIssues = [
  {
    id: 1,
    status: "New",
    owner: "Ravan",
    effort: 5,
    created: new Date("2018-08-15"),
    due: undefined,
    issue_title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2018-08-16"),
    due: new Date("2018-08-30"),
    issue_title: "Missing bottom border on panel",
  },
  {
    id: 3,
    status: "Ready",
    owner: "Sofi",
    effort: 33,
    created: new Date("2023-09-27"),
    due: new Date("2023-10-30"),
    issue_title: "Read all book in English",
  },
];
*/