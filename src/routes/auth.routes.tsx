import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';
import { ForgetPassword } from '../pages/ForgetPassword';
import Landing from '../pages/Landing';
import Signin from '../pages/Login/';
import Orphanage from '../pages/Orphanage';
import OrphanageApply from '../pages/OrphanageApply';
import OrphanagesMap from '../pages/OrphanagesMap';
import ResetPassword from '../pages/ResetPassword';


const AuthRoutes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Redirect from="/dashboard" to="/" />
            {/* <Redirect from="/user/create" to="/" /> */}
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/login" component={Signin} />

            <Route path="/recovery" component={ForgetPassword} />
            <Route path="/reset/:token" component={ResetPassword} />

            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanage/status" component={OrphanageApply} />
            <Route path="/orphanage/:id" component={Orphanage} />
        </Switch>
    </BrowserRouter>
);

export default AuthRoutes;
