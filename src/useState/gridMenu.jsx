import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { BoxingCars, Heading, StylingBoxes } from '../../style'
import { campcar } from '../page/data/mockdata'
import StarIcon from '@mui/icons-material/Star';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { caravan } from '../page/data/caravan';
import { tuning } from '../page/data/tuning';
import { usedCar } from '../page/data/usedCars';
import Img from '..//assets/caravan-8.png'

// style
export const Star = styled(StarIcon)`
  color: rgb(255, 122, 0);
`
export const SLink = styled(Link)`
  text-decoration: none;
  display: grid;
  grid-template-rows: 1fr 1fr;
  color: black;
  padding: 20px;
  height: 300px;
  width: 200px;
  box-shadow: 0 0 5px 0px lightgray;
  align-items: center;
  border-radius: 20px;
  background-color: white;

  @media(max-width: 560px){
        width: 80%;
  }
  @media(max-width: 440px){
        width: 80%;
  }
  &:hover{
        transform: scale(1.02);
    }
  img{
    width: 100%;
    height: 140px;
  }
  h3{
    color: var(--text, #373737);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  h1{
    color: var(--blue, #006DAB);
    font-family: Montserrat;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  p{
    font-size: 12px;
    font-weight: 400;
    font-family: Montserrat;
    color: #373737;
    display: flex;
    align-items: center;
  }
`
export const Buttons = styled.button`
  border: 1px solid #006DAB;
  border-radius: 10px;
  color: #006DAB;
  font-weight: 600;
  padding: 10px 20px ;
  background-color: inherit;
  margin-right: 10px;
  &:hover{
    background-color: #006DAB;
    color: white;
    cursor: pointer;
  }
  &:focus{
    background-color: #006cab68;
  }
`
export const Rating = styled.p`
  display: flex;
  justify-content: space-between;
`
export const FunctionButtons = styled.div`
  display: grid;
  row-gap: 10px;
`
export const Container = styled.div`
  position: relative;
  display: grid;
    margin-inline: auto;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    background-position: center;
    grid-gap: 30px;
    flex-shrink: 0;
    padding: 30px 0;
    transition: 0ms.9s;

    input{
      position: absolute;
      background-color: inherit;
      top: -52px;
      left: 100px;
      width: 600px;
      border: 1px solid black;
      padding: 10px 10px;
      border-radius: 5px;
    }
    
    div{
      &:hover{
      /* transition: 0ms.9s; */
      }
    }
    @media(max-width: 1100px){
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-around;
        align-items: center;
    }
    @media(max-width: 850px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        /* align-items: center; */
        /* background-color: red; */
        margin-inline: 50px;
    }
    @media(max-width: 560px){
        display: grid;
        grid-template-columns: 1fr;
        justify-content: space-around;
        align-items: center;
        width: 70%;
        margin-inline: auto;
    }
    @media(max-width: 440px){
        display: grid;
        grid-template-columns: 1fr;
        justify-content: space-around;
        align-items: center;
        width: 70%;
    }
`


const GridMenuComponent = ({filter}) => {
  const [data, setData] =useState([])


  return (
    <Container>
      {/* <input type="text" onChange={handleChange} placeholder='Type to search'/> */}
   {/*    {filter.map((value)=>{
        return(
          <div key={value.id}>
            <SLink to={`/motor/${value.id}`}>
              <img src={value.car.photo}/>
              <FunctionButtons>
                <h3>{value.car.name}</h3>
                <Rating>{value.car.company}<p><Star/>{value.car.rating}</p></Rating>
                <h1>{value.car.cost}W</h1>
                <div>
                  <Link to={`/cart/${value.id}`}><Buttons>Order</Buttons></Link>
                  <Buttons>Compare</Buttons>
                </div>
              </FunctionButtons>
            </SLink>
          </div>
        )
      })} */}
      {filter.map((value)=>{
        return(
          <div key={value.id}>
            <SLink to={`/motor/${value._id}`}>
              <img src={value?.photo || Img}/>
              <FunctionButtons>
                <h3>{value.name}</h3>
                <Rating>{value.company}<p><Star/>{value.rate}</p></Rating>
                <h1>{value.cost}W</h1>
                <div>
                  <Link to={`/cart/${value.id}`}><Buttons>Order</Buttons></Link>
                  <Buttons>Compare</Buttons>
                </div>
              </FunctionButtons>
            </SLink>
          </div>
        )
      })}
    </Container>
  )
}

export default GridMenuComponent


export const GridMenuCaravanComponent = ({filter}) => {
  const data = caravan.maindata;
  return (
    <Container>
      {filter.map((value)=>{
        return(
          <div key={value.id}>
            <SLink to={`/caravan/${value._id}`}>
              <img src={value?.photo || Img}/>
              <FunctionButtons>
                <h3>{value.name}</h3>
                <Rating>{value.company}<p><Star/>{value.rate}</p></Rating>
                <h1>{value.cost}W</h1>
                <div>
                  <Link to={`/cart/${value.id}`}><Buttons>Order</Buttons></Link>
                  <Buttons>Compare</Buttons>
                </div>
              </FunctionButtons>
            </SLink>
          </div>
        )
      })}
    </Container>
  )
}

export const GridMenuTuningComponent = ({filter}) => {
  return (
    <Container>
       {filter.map((value)=>{
        return(
          <div key={value.id}>
            <SLink to={`/tuning/${value._id}`}>
              <img src={value?.photo || Img}/>
              <FunctionButtons>
                <h3>{value.name}</h3>
                <Rating>{value.company}<p><Star/>{value.rate}</p></Rating>
                <h1>{value.cost}W</h1>
                <div>
                  <Link to={`/cart/${value.id}`}><Buttons>Order</Buttons></Link>
                  <Buttons>Compare</Buttons>
                </div>
              </FunctionButtons>
            </SLink>
          </div>
        )
      })}
    </Container>
  )
}
export const GridMenuUsedCarComponent = ({filter}) => {
  return (
    <Container>
      {filter.map((value)=>{
        return(
          <div key={value.id}>
            <SLink to={`/usedCar/${value._id}`}>
              <img src={value?.photo || Img}/>
              <FunctionButtons>
                <h3>{value.name}</h3>
                <Rating>{value.company}<p><Star/>{value.rate}</p></Rating>
                <h1>{value.cost}W</h1>
                <div>
                  <Link to={`/cart/${value.id}`}><Buttons>Order</Buttons></Link>
                  <Buttons>Compare</Buttons>
                </div>
              </FunctionButtons>
            </SLink>
          </div>
        )
      })}
    </Container>
  )
}

