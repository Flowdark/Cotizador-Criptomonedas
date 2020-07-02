import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./Componentes/Formulario";
import Cotizacion from "./Componentes/Cotizacion";
import Spinner from "./Componentes/Spinner";
import axios from "axios";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.div`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [ moneda, guardarMoneda ] = useState("")

  const [ criptomoneda, guardarCriptomoneda ] = useState("");

  const [ resultado, guardarResultado ] = useState({})

  const [ cargando, guardarCargado ] = useState(false);

  useEffect( () => {
    
    const cotizarCriptomoneda = async () => {

      //Evitar Ejecución Primera Vez
      if( moneda === "" ) return;
      
      //Consultar Api para obtener cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //Mostrar Spinner
      guardarCargado(true);

      //Ocultar Spinner y Mostrar Resumen

      setTimeout( () => {

        guardarCargado(false);

        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

      }, 3000 )

    }

    cotizarCriptomoneda();

  }, [moneda, criptomoneda] )

  //Mostrar Spinner o Resultado

  let componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />; 

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen Cripto Monedas"
        />
      </div>
      <div>
        <Heading>
          Cotiza Criptomonedas al Instante
        </Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
