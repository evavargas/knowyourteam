import React, {Fragment} from 'react';
import Navigation from './../components/Navigation/Navigation';
import Routes from './Routes';

//componente funcional
const Layout = () => {
    return ( 
        <Fragment>
            <Navigation></Navigation>
            <main className='container'>
                <Routes/>
            </main>

        </Fragment>    
     );
}
 
//componente funcional
export default Layout;