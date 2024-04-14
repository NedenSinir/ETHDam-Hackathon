import React from 'react';

interface NewComponentProps {
}


const TestComponent: React.FC<NewComponentProps> = () => {
    const handleClick = () => {
        console.log('TestComponent was clicked!');
    };

    return (
        <div onClick={handleClick}>
            Test Component
        </div>
    );
}

export default TestComponent;