import {React, ReactRouter, getSilentRouterHistory} from "../index";
import Layout from "./components/layout";
import Main from "./pages/main";
import Panels from "./pages/panels";
import Popups from "./pages/popups";
import Buttons from "./pages/buttons";
import Graphs from "./pages/graphs";
import Forms from "./pages/forms";

let {Router, Route, IndexRoute} = ReactRouter;

export default <Router history={getSilentRouterHistory()}>
    <Route component={Layout} path="/">
        <IndexRoute component={Main}/>
        <Route path="panels" component={Panels}/>
        <Route path="popups" component={Popups}/>
        <Route path="buttons" component={Buttons}/>
        <Route path="graphs" component={Graphs}/>
        <Route path="forms" component={Forms}/>
    </Route>
</Router>;