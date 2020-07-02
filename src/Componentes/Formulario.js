import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import useMoneda from "../Hooks/useMoneda";
import useCriptomoneda from "../Hooks/useCriptomoneda";
import axios from "axios";
import ErrorMensaje from "./Error";

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {

    const [ listacripto, guardarCriptomonedas ] = useState([])

    const MONEDAS = [ 
        { codigo: "USD", nombre: "Dolar de Estados Unidos" }, 
        { codigo: "COP", nombre: "Pesos Colombianos" }, 
        { codigo: "EUR", nombre: "Euro" }, 
        { codigo: "GBP", nombre: "Libra Esterlina" } 
    ];

    // Error

    const [ error, guardarError ] = useState(false)

    //Utializar useMonedda

    const [ moneda, SelectMonedas ] = useMoneda("Elige tu Moneda", "", MONEDAS)

    //Utilizar useCriptomoneda

    const [ criptomoneda, SelectCripto ] = useCriptomoneda("Elige tu Criptomoneda", "", listacripto)

    //Ejecutar Llamado a la API

    useEffect( () => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, [] )

    const cotizarMoneda = e => {
        e.preventDefault();

        if( moneda.trim() === "" || criptomoneda.trim() === "" ){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <ErrorMensaje mensaje = "Todos los campos son obligatorios" /> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;