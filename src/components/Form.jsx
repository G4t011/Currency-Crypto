import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { currency } from '../data/currency' 


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 20px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ( {setValues} ) => {
    
    const [ cryptos, setCryptos ] = useState([])
    const [ error, setError ] = useState(false)

    // currency came from file currency.js
    const [ Currancy, SelectCurrency ] = useSelectCurrency('Elige tu Moneda', currency)
    const [ Cryptocoin, SelectCryptocoin ] = useSelectCurrency('Elige tu Criptomoneda', cryptos)

    // Call just once
    useEffect( ()=> {
        const checkAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

            const answer = await fetch(url)
            const result = await answer.json()
            // console.log(result.Data);

            const arrayCryptos = result.Data.map( crypto => {

                const object = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }

                
                return object
            })
            // console.log(arrayCryptos)
            setCryptos(arrayCryptos)

        }
        checkAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([Currancy, Cryptocoin].includes('')){
            setError(true)
            return
        }
        setError(false)
        setValues({
            Currancy,
            Cryptocoin
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >

                < SelectCurrency />
                < SelectCryptocoin />

                <InputSubmit 
                type="submit" 
                value="Cotizar" />
            </form>
        </>
  )
}

export default Form