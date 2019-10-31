import React from 'react';
import Button from '../UI/Button';

const Register = ({onCancel}) => {
    return ( 
    <div>
        <h2 className='text-center text-primary'>Sign Up</h2>
        <hr/>
        <form action="">
            <div className='form-group text-center'>
                <Button bsClasses='btn-outline-danger btn-lg mr-2' 
                clicked={onCancel}>Cancel
                </Button>
            </div>
        </form>
    </div>
    );
};
 
export default Register;