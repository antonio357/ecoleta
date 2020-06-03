import React from 'react'

// insterface defines a type os an object
interface HeaderProps {
    title: string; // means this is obligatory
    none?: null; // means this is not obligatory
}

// React.FC: is a generic type from typescript that can receive a parameter 'generic' <HeaderProps>
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header