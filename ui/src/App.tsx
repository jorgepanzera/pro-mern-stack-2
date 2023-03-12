import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import 'babel-polyfill'
import 'whatwg-fetch'

import { IssueList } from './IssueList'

// elemento html que va a contener el codigo que vamos a inyectar por React
const container = document.getElementById('contents')

// root a partir del html container, desde donde se va a renderizar
const root = createRoot(container!)

// Crear issue list y la renderizo
const element = <IssueList />
root.render(element)
