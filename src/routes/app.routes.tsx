import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';


import Dashboard from '../pages/Dashboard';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';
import Register from '../pages/Register';
import DeleteOrphanage from '../pages/DeleteOrphanage';
import PendingOrphanage from '../pages/PendingOrphanages';
import OrphanagePermit from '../pages/OrphanagePermit';
import EditOrphanage from '../pages/EditOrphanage';
import Users from '../pages/Users';
import UserEdit from '../pages/UserEdit';
import OrphanageApply from '../pages/OrphanageApply';

const AppRoutes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Redirect from="/login" to="/dashboard" />
            {/* <Redirect from="/app" to="/dashboard" /> */}
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/dashboard/user/create" component={Register} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanage/status" component={OrphanageApply} />
            <Route path="/orphanage/:id" component={Orphanage} />
            <Route path="/dashboard/delete/:id" component={DeleteOrphanage} />
            <Route path="/orphanages/pending" component={PendingOrphanage} />
            <Route path="/dashboard/pending/:id" component={OrphanagePermit} />
            <Route path="/dashboard/edit" component={EditOrphanage} />
            <Route path="/dashboard/users" component={Users} />
            <Route path="/dashboard/user/edit" component={UserEdit} />
        </Switch>
    </BrowserRouter>
);

export default AppRoutes;