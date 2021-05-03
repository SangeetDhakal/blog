import React, { useState } from 'react';
import style from '../public/Static/css/header.module.css'
import { APP_NAME } from '../config'
import Router from 'next/router'
import Link from 'next/link'
import NProgress from 'nprogress';
import { signout, isAuth } from '../actions/auth'
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

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (

    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavbarBrand href="/">
    {/* <div class="sign"> */}
      <span class={style.fastflicker}>W</span>iki Stacks
    {/* </div> */}
  </NavbarBrand>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            

            {!isAuth() && <React.Fragment>

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



            </React.Fragment>}
            {isAuth() && isAuth().role === 0 && <React.Fragment>

            
              <NavItem>

                <Link href="/user">
                  <NavLink href='/user' >{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>

              </NavItem>
          

              <NavItem>
                <Link href="/user/crud/blogs">
                  <NavLink href="/signin">Update Blogs</NavLink>
                </Link>

              </NavItem>

              <NavItem>
                <Link href="/user/crud/blog">
                  <NavLink href="/user/crud/blog" className="btn btn-primary text-light">Write a blog</NavLink>
                </Link>

              </NavItem>

              
              </React.Fragment>

            }

            
            {isAuth() && isAuth().role === 1 && <React.Fragment>
              <NavItem>

                <Link href="/admin">
                  <NavLink href='/admin' >{`${isAuth().name}'s Dashboard`}</NavLink>

                </Link>
              </NavItem>
              <NavItem>
                <Link href="/admin/crud/blogs">
                  <NavLink href="/signin">Update Blogs</NavLink>
                </Link>

              </NavItem>
              <NavItem>
                <Link href="/admin/crud/blog">
                  <NavLink href="/admin/crud/blog" className="btn btn-primary text-light">Write a blog</NavLink>
                </Link>

              </NavItem>

              </React.Fragment>
}
{isAuth() && (
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace('/signin'))} >Sign Out</NavLink>
              </NavItem>
            )}

            
            
           
            
            
          


          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );


}


export default Header;
