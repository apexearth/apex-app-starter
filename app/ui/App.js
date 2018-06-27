require('./App.less')
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import Home from './pages/Home'


export default class App extends React.Component {
    constructor() {
        super()
        let game = require('../game')
    }

    componentDidMount() {
    }

    render() {
        return <Router id="app">
            <div id="page">
                <Route exact path="/" component={Home}/>
            </div>
        </Router>
    }
}
