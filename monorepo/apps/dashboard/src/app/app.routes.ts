import { Route } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';

export const appRoutes: Route[] = [
    {path: "login", component: Login},
    {path: "", component: Home}
];
