import React from "react";
import "./footer.css";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div className="logo">
              <div className="andromeda">
                <h1 className="text-white">Andromeda</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quas inventore illo culpa dolores numquam nulla fugit
              ipsum incidunt deserunt.
            </p>
          </Col>
          <Col lg="3" md="6" className="mb-4">
            <div className="footer__quick-links">
              <h4 className=" contact_title quick__links-title">
                Top Categories
              </h4>
              <ListGroup className="footer__listGroup">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phones</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className=" contact_title quick__links-title">
                Useful Links
              </h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/CART">Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3 " md="4">
            <div className="footer__quick-links">
              <h4 className=" contact_title quick__links-title">Contact</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex align-ittems-center gap-2">
                  <span>
                    <i className="ri-map-pin-line icon"></i>
                  </span>
                  <p>123 İstanbul, Beşiktaş, Türkiye </p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-ittems-center gap-2">
                  <span>
                    <i className="ri-phone-line icon"></i>
                  </span>
                  <p>0555 555 55 55</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-ittems-center gap-2">
                  <span>
                    <i className="ri-mail-line icon "></i>
                  </span>
                  <p>example@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="footer__copyright">
              ©Copyright {year} developed by Tuğba Gündoğdu. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
