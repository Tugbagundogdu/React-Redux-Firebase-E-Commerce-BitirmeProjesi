import React from "react";
import { useRef, useEffect } from "react";

import { Link} from "react-router-dom";
import { useNavigate , NavLink } from "react-router-dom";
import "./header.css";

// userIcon fotosunun üzerine tıklayınca büyümesini sağlar.
import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";

//Logout işlemleri
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";



const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth();


  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Logged out')
      navigate('/home');
    }).catch(err=>{
      toast.error(err.message)
      })
  }

  


  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle(".active__menu");

  const navigateToCart = ()=>{
    navigate("/cart");
  }

  const toggleProfileActions = () =>  profileActionRef.current.classList.toggle('show__profileActions') 

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link style={{textDecoration:"none"}} to="/">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div className="andromeda">
                <h1>Andromeda</h1>
              </div>
            </div>
            </Link>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img whileTap={{ scale: 1.2 }} src={ currentUser ? currentUser.photoURL : userIcon} alt="" 
                onClick={toggleProfileActions}
                />

                <div className="profile__actions"
                 ref={profileActionRef}  onClick={toggleProfileActions}>
                  {
                    currentUser ? <span onClick={logout}>Logout</span> : 
                    <div className="profile__islemler">
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>                    
                    </div>
                  }
                </div>

              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
