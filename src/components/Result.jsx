import styled from "@emotion/styled"

const Container = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;

`

const Image = styled.img`
    display: block;
    width: 120px;
`

const Text = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`
const Price =styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`

const Result = ({result}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result 
  return (
    <Container>
        <Image 
            src={`https://cryptocompare.com/${IMAGEURL}`} 
            alt="image crypto"/>
        <div>
            <Price>El precio es de: <span>{PRICE}</span></Price>
            <Text>El precio mas alto del día es de: <span>{HIGHDAY}</span></Text>
            <Text>El precio mas bajo del día: <span>{LOWDAY}</span></Text>
            <Text>Variación del día: <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Última actualización: <span>{LASTUPDATE}</span></Text>
        </div>
    </Container>
  )
}

export default Result