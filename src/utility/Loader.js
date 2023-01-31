import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
    return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner  size="lg" color="info">
                    Loading...
                </Spinner>
            </div>
    );
};

export default Loader;