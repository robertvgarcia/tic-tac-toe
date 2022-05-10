import React from 'react';

// Notice how we passed in the onClick function
// then the rest of the styles which can be nearly
// any HTML/CSS attributes. This could also be hard-coded
// with className="a class name here" or style={{ property: value }}
// Take a look in the web inspector to see how these are rendered
function Button( { onClick, ...styles }) {
    return (
        <div>
            <button { ...styles } onClick={ onClick }>Reset</button>    
        </div>
    );

}

export default Button;