import React from "react"

import UserLogin from "pages/Login/Login"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { useContext } from "react"
import StoreContext from "components/Store/Context"
import StoreProvider from "components/Store/Provider"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(StoreContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  )
}

const Routes = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route exact path="/" component={UserLogin} />
        <PrivateRoute path="/app" component={() => <h1>App</h1>} />
        <PrivateRoute
          path="/home"
          component={() => <h1>Você está logado</h1>}
        />
      </Switch>
    </StoreProvider>
  </BrowserRouter>
)

export default Routes
