import { Route, Switch, Redirect } from "react-router-dom";
import Mailbox from "../../pages/Mailbox";

const Routerer = () => {
    return (
        <>
        <Switch>
        <Route path="/" exact>
                <Redirect to="/email" />
            </Route>
        <Route path="/email" >
             <Mailbox />
            </Route>
           
        </Switch>
        </>
    );
};

export default Routerer;