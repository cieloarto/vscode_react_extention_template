import React from "react";

export const App = () => {

    const [count, setCount] = React.useState(0);

    return (
        <div>
            <h1>Hello, world!!!!###!</h1>
            <p>You clicked {count} times</p>
            <button type="button" onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}