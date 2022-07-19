import { Route, Redirect } from "react-router-dom";
import { useUser } from "./useUser";

export const PrivateRoute = (props) => {
  let user = useUser();
  if (!user) {
    return <Redirect to="/login" />;
  } else {
      return <Route {...props} />;
  }
};
