import React from 'react'
// import { Link } from 'react-router-dom'
import './style.less'

// const isCurrent = (to, current) => {
//   if (to === '/' && current === to) {
//     return true
//   } else if (to !== '/' && current.includes(to)) {
//     return true
//   }

//   return false
// }

// const HeaderLink = ({ to, text, current }) =>
//   <li className={isCurrent(to, current) ? 'current' : ''}>
//     <Link to={to}>{text}</Link>
//   </li>

export default ({ isAuthenticated, current }) =>
  <header className="header">
    <nav className="header-nav">
      <ol className="header-nav__left">
        <li className="header-nav__item">Nav1</li>
        <li className="header-nav__item">Nav2</li>
        <li className="header-nav__item">Nav3</li>
      </ol>
      <ol className="header-nav__right">
        <li className="header-nav__item">Nav4</li>
        <li className="header-nav__item">Nav5</li>
        <li className="header-nav__item">Nav6</li>
      </ol>
    </nav>
  </header>
