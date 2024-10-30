import React from 'react';

export default function DemoComponent (props) {
    const [state, setState] = React.useState(true);
    console.log(props);
    const {testProp, single} = props;
    return (
        <div className='demo-component'>
            <h1>Hello, from the {testProp}!</h1>
            <p>This is from a data-prop: {single}</p>
            <button onClick={() => setState(!state)}>Toggle State</button>
            <p>State is: {state ? 'true' : 'false'}</p>
        </div>
    );
};