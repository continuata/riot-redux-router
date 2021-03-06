import route from 'riot-route'
import actions from './actions'

// URL separator for riot router
const separator = '/'

export default function (_ref) {
  const dispatch = _ref.dispatch
  const getState = _ref.getState

  // listen for riot router changes - re-dispatch with routeChanged
  route((...args) => {
    const newArgs = args.filter(item => typeof item === 'string' )
    dispatch(actions.routeChanged(newArgs.join(separator)))
  })

  // set the base route separator
  route.base(separator)

  // start listening to routes immediately
  route.start(true)

  return (next) => (action) => {
    // allow everything except ROUTER_GO_ACTION through
    if (action.type !== 'ROUTER_GO_ACTION') {
      next(action)
    }
  }
}
