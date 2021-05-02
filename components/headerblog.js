import React, { useState } from 'react';


import Link from 'next/link'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import Search from './blog/Search'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (

    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavbarBrand href="/">WIKI STACKS</NavbarBrand>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            

             <React.Fragment>

              <NavItem>

                <Link href="/blogs">
                <NavLink href="/user/crud/blog" className="btn btn-primary text-light">Blogs</NavLink>
                </Link>

              </NavItem>

              <NavItem>

                <Link href="/categories/entertainment">
                <NavLink href="/categories/entertainment">Entertainment</NavLink>
                </Link>

              </NavItem>
              <NavItem>

                <Link href="/categories/wiki">
                <NavLink href="/categories/wiki" className="btn btn-secondary text-light">Wiki</NavLink>
                </Link>

              </NavItem>
              <NavItem>

                <Link href="/categories/news">
                <NavLink href="/categories/news">News</NavLink>
                </Link>

              </NavItem>

             <NavItem>

                <Link href="/contact">
                  <NavLink href="/contact">Contact Us</NavLink>
                </Link>

              </NavItem>
              <NavItem>

                <Link href="/about-us">
                  <NavLink href="/about-us">About Us</NavLink>
                </Link>

              </NavItem>
              <NavItem>

                <Link href="/privacy-policy">
                  <NavLink href="/privacy-policy">Privacy Policy</NavLink>
                </Link>

              </NavItem>
              <NavItem>

                <Link href="/terms">
                  <NavLink href="/terms">Terms</NavLink>
                </Link>

              </NavItem>



            </React.Fragment>
            

          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );


}


export default Header;
