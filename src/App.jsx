import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Result from './components/Result'
import Load from './components/Load'
import CriptoImage from './img/imagen-criptos.png'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
  

`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;

`

const Heading = styled.h1 `
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px; 

  /* Pseudoelement */
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto;
  }

`

function App() {

  const [ values, setValues ] = useState({})
  const [result, setResult] = useState({})
  const [uploading, setUploading] = useState(false)

  useEffect(() =>{
    // verify if object has something
    if(Object.keys(values).length > 0) {
      setUploading(true)
      setResult({})
      // object distruct
      const { Currancy, Cryptocoin } = values
      // func to exec
      const quoteCrypto =async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Cryptocoin}&tsyms=${Currancy}`

        const answer = await fetch(url)
        const result = await answer.json()

        setResult(result.DISPLAY[Cryptocoin][Currancy])
      
        setUploading(false)
      }
      // call of func
      quoteCrypto();
    }
  }, [values])

  return (
      <Container>

        <Image
          src = {CriptoImage}
          alt = "Image of criptos"
        />
        <div>
          <Heading>Cotiza Criptomonedas</Heading>

          <Form
            setValues = {setValues}
          />

          {uploading && <Load/> }
          {result.PRICE && <Result
            result = {result}
          /> }
        </div>
      </Container>
  )
}

export default App
