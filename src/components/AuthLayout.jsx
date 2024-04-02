import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children, authentication=true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    // first thing first, we will ask store if user is logged in or not
    // we are not dependent on the passed value by the user. We will be asking the store first.
    const authStatus = useSelector(state => state.auth.status);
    // the status we are getting from the store/authSlice --> login --> state.status

    // now adding another layer of security -- using useEffect.
    // This will tell us whether we have to send the user to login page or home page or
    // any other page.. or if any extra checking is required or not.
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            // we are checking both the authentication which is true by default,
            // as well as the authStatus from store.
            // the condition in if block here is, authentication which is true (if user haven't sent anything)
            // and let's say authStatus from store is false.
            // so it will be like: true && true !== false --> true && true --> redirected to login page.
            // because user is not authenticated as per the condition.

            navigate("/login");

        } else if (!authentication && authStatus !== authentication) {
            // the condition here is, if the user sent authentication as false..
            // and authStatus from store is true.
            // so it will be like: !false && true !== false --> true && true --> redirected to login page.
            navigate("/");
        }
        setLoader(false);

    }, [authStatus, navigate, authentication]);
    // so useEffect will keep an eye on any changes happend on authStatus, navigate, authentication
    // if any changes happend within them, useEffect will automatically run again.

    return loader ? <h1>Loading...</h1> : <>{children}</>
    // directly checking if the loader is true or not. Because for any condition in useEffect, the setLoader
    // is always becoming false. Thus the loader value becomes false. 
    // So, if loader is true, show "Loading...", and if false, show the children values.
}


/*
This component is here to protect the routes. This is like a protected container
within which we will keep all the state where user should only reach if he/she is
logged in.. or an admin.
*/

/*
INTERESTING FACT ::

Here we kept the file name and function name different, and that doesn't throws any error.
We kept the exported function name Protected, so that it becomes easier to understand 
if we need to protect the children props.
Also we kept authenticaltion as true. If some other component calls it with authentication
as false, we will check further if we should give it the protected content or not.
*/

