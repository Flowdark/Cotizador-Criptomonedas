import React from 'react';
import styled from "@emotion/styled";

const ErrorMensaje = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: #fff;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
    letter-spacing: 2px;
`;

const Error = ({ mensaje }) => {
    return ( 
        <ErrorMensaje>{mensaje}</ErrorMensaje>
     );
}
 
export default Error;