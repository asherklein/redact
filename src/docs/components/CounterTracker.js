import React from "react"
import redact from "../../../lib"
import { curry, uniq, append } from 'ramda'
// Action definitions
const USER_CHANGE_ACTION = 'USER_CHANGE_ACTION'
const POINTS_ACTION = 'POINTS_ACTION'


// Reducer definitions
const userReducer = (state, action) => 
    action.type == USER_CHANGE_ACTION ? 
    action.payload 
    : state || ''

const pointsReducer = (state, action) => 
    action.type == POINTS_ACTION ? 
    state + action.points 
    : state || 0

const contribsReducer = (state, action) => 
    action.type == POINTS_ACTION ? 
    uniq(append(action.user, state))
    : state || []

// Define (curried) event handlers 
const userChange = curry((dispatch, event) => 
    dispatch({
        type: USER_CHANGE_ACTION,
        payload: event.target.value
    })
)
const btnClick = curry((dispatch, user, event) => 
    dispatch({
        type: POINTS_ACTION,
        points: 1,
        user
    })
)

// FUNCTONAL component definition
// `props` includes state and dispatch
const CounterTracker = (props) => (
    <div>
        <label>User: </label>
        <input type='text'
            value={props.user}
            onChange={userChange(props.dispatch)}
        />
        <button 
            onClick={btnClick(props.dispatch, props.user)}
        >
        Click for points!
        </button>
        <span>
            <h1>{ props.points } </h1>
        </span>
        <div>
            <p>Contributors: { props.contributers.join(', ') } </p>
        </div>
    </div>
)

export default redact({}, {
    user: userReducer,
    points: pointsReducer,
    contributers: contribsReducer
})(CounterTracker)
