import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props) => {
  let user = false;
  if (!user) {
    return <Redirect to="/login" />;
  } else {
      return <Route {...props} />;
  }
};
