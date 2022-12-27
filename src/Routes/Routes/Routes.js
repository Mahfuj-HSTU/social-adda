import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../../layout/HomeLayout/HomeLayout';
import Main from '../../layout/Main/Main';
import About from '../../pages/About/About';
import Login from '../../pages/Login/Login';
import Media from '../../pages/Media/Media';
import Message from '../../pages/Message/Message';
import SignUp from '../../pages/SignUp/SignUp';

const router = createBrowserRouter( [
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <HomeLayout></HomeLayout>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/message',
                element: <Message></Message>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
] )
export default router;
