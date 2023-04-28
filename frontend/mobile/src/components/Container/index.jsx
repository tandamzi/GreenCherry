import React from 'react';

import cs from 'classnames';

import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import MainBody from './components/MainBody';
import MainFooter from './components/MainFooter';
import MainFooterWithNavigation from './components/MainFooterWithNavigation';
import MainHeader from './components/MainHeader';
import SubPageHeader from './components/SubPageHeader';
import style from './index.module.scss';

const Container = ({ children, className }) => {
  return (
    <div
      id="cherry-container"
      className={cs('container-sm', style.Container, className)}
    >
      {children}
    </div>
  );
};

Container.Header = Header;
Container.MainHeader = MainHeader;
Container.Body = Body;
Container.MainBody = MainBody;
Container.Footer = Footer;
Container.MainFooter = MainFooter;
Container.MainFooterWithNavigation = MainFooterWithNavigation;
Container.SubPageHeader = SubPageHeader;

export default Container;
