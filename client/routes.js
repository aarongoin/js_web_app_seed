import Home from './route/Home';
import Join from './route/Join';
import Login from './route/Login';
import PasswordManager from './route/PasswordManager';

const routes = [
    ["/", Home, 'exact'],
    ["/join", Join, 'exact'],
    ["/login", Login, 'exact'],
    ["/password", PasswordManager, 'exact']
];

export default routes;