import React, {Fragment} from 'react';
import Navigation from './../components/Navigation/Navigation';

//componente funcional
const Layout = () => {
    return ( 
        <Fragment>
            <Navigation></Navigation>
            <main className='container'>
                <div>
                    Componente hijo
                </div>
            </main>

        </Fragment>    
     );
}
 
//componente funcional
export default Layout;