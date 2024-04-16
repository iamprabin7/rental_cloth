import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar';
import publicRoutesList from '../../routes/Publicroutelist';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const FrontendLayout = () => {
    useEffect(() => {
        // Load Tawk.to script when the component mounts
        const loadTawkToScript = () => {
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6603e4fba0c6737bd1255c02/1hpvjctv9';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
            })();
        };

        loadTawkToScript();

        // Clean up function to remove the Tawk.to script if the component unmounts
        return () => {
            const script = document.querySelector('script[src="https://embed.tawk.to/6603e4fba0c6737bd1255c02/1hpvjctv9"]');
            if (script) {
                script.remove();
            }
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <Switch>
                    {publicRoutesList.map((routedata, idx) => {
                        return (
                            routedata.component && (
                                <Route 
                                    key={idx}
                                    path={routedata.path}
                                    exact={routedata.exact}
                                    name={routedata.name}
                                    render={(props) => (
                                        <routedata.component {...props} />
                                    )}
                                />
                            )
                        )
                    })}
                </Switch>
            </div>
            {/* <div className="whatsapp-chat">
                <a href="">
                    <img src={process.env.PUBLIC_URL + '/components/frontend/images/whatsapp.png'} alt="whatsapp-chat" />
                </a>
            </div> */}
        </div>
    );
}

export default FrontendLayout;
