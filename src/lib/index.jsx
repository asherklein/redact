import React, { Component } from 'react';
import { map, mapObjIndexed as mapo, curry, compose, forEach, always, prop } from 'ramda'
//testing 
import { tap } from 'ramda'
const log = curry((title, content) => {
  console.log(title, content)
  return content
})

const logger = log

// ------ END TESTING

// Action to initiate reducers
const initAction = {
  type: '@@REDACT@@INIT'
}



const redact = (methods, reducers, RedactedComponent) => {



  return class Redact extends Component {
    constructor(props) {
      super(props)

      // Setup reducers
      this.state = map(fn => fn(undefined, initAction), reducers)

      // Setup lifecycle methods
      // forEach(, methods)

      // Setup dispatch
      // Will eventually become dispatch once partially applied to state and reducers
      const dispatchSetup = curry((reducers, action) => {
        return mapo((fn, key) => {
          console.log(key, fn)
          return fn(prop(key, this.state), action)
        }, reducers)
      })
      this.dispatch = compose(this.setState.bind(this), logger('dsetup'), dispatchSetup(reducers))
    }

    render = () => <RedactedComponent
      {...this.props}
      {...this.state}
      dispatch={this.dispatch} />
  }



}

export default curry(redact)
