var route = require('riot-route')

var actions = require('./actions')

// URL separator for riot router
var separator = '/'

function riotRouterMiddleware (_ref) {
  var dispatch = _ref.dispatch
  var getState = _ref.getState

  // listen for riot router changes - re-dispatch with routeChanged
  route(function () {
    var args = Array.prototype.slice.call(arguments)
    dispatch(actions.routeChanged(args))
  })

  // set the base route separator
  route.base(separator)

  // start listening to routes immediately
  route.start(true)

  return function (next) {
    return function (action) {
      // allow everything except ROUTER_GO_ACTION through
      if (action.type !== actions.ROUTER_GO_ACTION) {
        next(action)
      }
    }
  }
}

module.exports = riotRouterMiddleware
