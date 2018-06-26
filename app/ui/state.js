import React from 'react'
import {EventEmitter} from 'events'
import localStorage from 'localStorage'

/**
 * The overall state of the UI.
 */
let state        = null
let stateVersion = 1

function defaultState() {
    return {
        stateVersion
    }
}

/**
 * An EventEmitter which the UI will subscribe to for state updates.
 * @type {EventEmitter.EventEmitter}
 */
let ee         = new EventEmitter()
module.exports = {
    new() {
        state = defaultState()
    },
    /**
     * Clear our state!
     */
    clear() {
        state = defaultState()
        module.exports.save()
        window.location = window.location
    },
    /**
     * Load our state from our local storage.
     * TODO: This is temporary -- we should be data-driven from a back-end.
     */
    load() {
        let jsonState = localStorage.getItem('state')
        if (jsonState) {
            let parsedState = JSON.parse(jsonState)
            // Do this so we add in the defaults for any new state objects which are missing.
            if (parsedState.version !== stateVersion) {
                state = defaultState()
            } else {
                state = Object.assign(defaultState(), parsedState)
            }
        } else {
            state = defaultState()
        }
    },
    /**
     * Save our state to our local storage.
     * TODO: This is temporary -- we should be data-driven from a back-end.
     */
    save() {
        console.log(state)
        localStorage.setItem('state', JSON.stringify(state))
    },

    on(key, cb) {
        ee.on(key, cb)
        return this.get(key)
    },
    off(key, cb) {
        ee.removeListener(key, cb)
    },
    emit(key, data) {
        ee.emit(key, data)
    },
    set(key, value) {
        state[key] = value // TODO: Clone value? Immutability?
        module.exports.save()
        module.exports.emit(key, value)
    },
    get(key) {
        return state[key]
    },
}

module.exports.load()
global.state = module.exports