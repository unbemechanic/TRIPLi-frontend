import React, { useEffect, useState } from 'react'
import { DirectContainer, DirectH, Header, IndentedDiv, NavDisSec, NavDisSecLang } from '../../style'
import SwipeableTemporaryDrawer from '../../materials/navbarMenu'
import { Link } from 'react-router-dom'
import { SLink } from '../linkStyle'
import BasicModal from '../../materials/signModal'

// cart imports
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

// cart style
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: -8,
      border: `2px solid #FF7A00`,
      padding: '0 4px',
      backgroundColor:'#FF7A00',
      height:'25px',
      width:'25px',
      borderRadius:'50%'
    },
}));
const CartIcon = styled(ShoppingCartIcon)`

  @media (max-width: 1300px){
    margin-left: 50px;

  }
`



// cart
function CustomizedCart() {
  const [ totalQuantity, setTotalQuantity ] = useState(0);
  const carts = useSelector(store => store.cart.items);
  useEffect(() => {
    let total = 0;
    carts.forEach(item => total += item.quantity)
    setTotalQuantity(total);
  }, [carts])
    return (
      <IconButton sx={{ color: '#006DAB', width: '20px', boxSizing: 'border-box' }} aria-label="cart">
      <CartIcon />
      {totalQuantity > 0 ? (
        <StyledBadge badgeContent={totalQuantity} color="secondary" />
      ) : null}
    </IconButton>

    );
  }


const Navbar = () => {
  const { currentUser } = useSelector(state => state.user)
  const [under1300, setUnder1300] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1300px)');
        const handleMediaQueryChange = (event) => setUnder1300(event.matches);
    
        handleMediaQueryChange(mediaQuery); // Check initial size
        mediaQuery.addEventListener('change', handleMediaQueryChange);
    
        // Clean up the event listener on component unmount
        return () => mediaQuery.removeEventListener('change', handleMediaQueryChange)
  })
  return (
    <div style={{
        backgroundColor: 'white', position:'sticky',top:'0', width:'100vw', zIndex:'9988'
    }}>
        <IndentedDiv>
            <Header>
                <Link style={{textDecoration:'none'}} to='/'><DirectH $name>Camper</DirectH></Link>
                <DirectContainer>
                    <SLink to="/motor"><DirectH>Motor<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></DirectH></SLink>
                    
                    <SLink to="/caravan"><DirectH>Caravan<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></DirectH></SLink>
                    <SLink to="/tuning"><DirectH>Tuning<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></DirectH></SLink>
                    <SLink to="usedCar"><DirectH>Used Car<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></DirectH></SLink>
                    <SLink to="/camping"><DirectH>Camping Place</DirectH></SLink>
                </DirectContainer>
                <SwipeableTemporaryDrawer/>
                <NavDisSecLang>
                    {currentUser ? <Link to='/cart' style={{marginRight:'0px',  width:'50px', position: under1300 ? 'absolute':'unset', right:'110px'}}><CustomizedCart/></Link> :''}
                    {currentUser ? 
                    <Link style={{ position: under1300 ? 'absolute':'unset', right:'60px'}} to={'/profile'}><img src={currentUser.avatar} alt='profile' style={{height:'35px', borderRadius:'50%', marginRight:'20px', width:'35px'}}/></Link>
                  :
                  <Link to={'/login'} style={{color:'black', textDecoration:'none'}}>Sign in</Link>}
                    
                    <NavDisSec>
                        <label for="lang">
                            <select id="lang" name='lang'>
                                <option value="English">En</option>
                                <option value="Russian">Ru</option>
                                <option value="Uzbek">Uzb</option>
                            </select>
                        </label>
                    </NavDisSec>
                </NavDisSecLang>
            </Header>
        </IndentedDiv>
    </div>
  )
}

export default Navbar