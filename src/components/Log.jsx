import React from 'react';

const Log = ({ logClick, log, value }) => {

    return (
        <li>
            <button className="log"
            value={ value }
                onClick={ logClick }>
                { log }
            </button>

        </li>
    );
}

export default Log;