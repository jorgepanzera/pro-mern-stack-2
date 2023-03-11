// Importar express http server
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { connectToDb } = require('./db')
const { issueListfromServer, createIssue } = require('./issues')

// crear aplicacion express
const app = express()

// ** CONFIGURACION DE LA API
// ---------------------------

// port para la API, desde archivo .env con default 3000
const port = process.env.API_SERVER_PORT || 3000

const enableCors = (process.env.ENABLE_CORS || 'true') == 'true'
console.log('CORS free:', enableCors)

// la forma de hacer segura la API serian:
//  en el uiserver.ts establecer un proxy para llamar desde alli a la API, y no desde el browser por direct call (promernstack cap 7.3)
//  direct calls a la API desde el browser (fetch), y que el server (este) permita todos los origines, o solamente aquellos
//  permitidos (que pueden setearse inclusive desde una BD) (https://stackabuse.com/handling-cors-with-node-js/)
if (enableCors) {
    app.use(cors()) // permitir consumir todos los metodos desde cualquier dominio
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging de todo lo que entra a la API

app.use((req: any, res: any, next: () => {}) => {
    // defino una funcion next que no hace nada, solo para que el app.use la pueda llamar

    // Log the req
    console.log(
        `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    )

    res.on('finish', () => {
        // Log the res
        console.log(
            `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
        )
    })

    next()
})

// ** Metodos expuestos de la API
// ---------------------------

// HealthCheck - metodo get simple para comprobar que esta "vivo" el servicio
app.get('/ping', (req: any, res: any, next: void) => res.status(200).json({ hello: 'world' }))

// GetAllIssues - GET
app.get('/issues', async (req: any, res: any, next: void) => {
    try {
        let issues = await issueListfromServer()
        res.status(200).json({ issues })
    } catch (error) {
        res.status(500).json({ error })
    }
})

// CreateIssue - POST
app.post('/issue/create', async (req: any, res: any, next: void) => {
    try {
        const savedIssue = await createIssue(req.body)
        res.status(200).json({ savedIssue })
    } catch (error) {
        res.status(500).json({ error })
    }
})

// start server en puerto definido
;(async function () {
    try {
        await connectToDb('issuetracker')
        app.listen(port, function () {
            console.log(`API server started on port ${port}`)
        })
    } catch (err) {
        console.log('ERROR:', err)
    }
})()
