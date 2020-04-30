import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.less'
import { FormattedMessage } from 'react-intl'

export interface HeaderProps {
  /** 是否有权限 */
  isAuth: boolean
}

/**
 * 应用Header导航
 */
const Header: React.FC<HeaderProps> = ({ isAuth }) => (
  <header className="header">
    <nav className="header-nav">
      <ol className="header-nav__left">
        <li className="header-nav__item">
          <NavLink to="/">
            <FormattedMessage id="page.home" defaultMessage="首页" />
          </NavLink>
        </li>
        <li className="header-nav__item">
          <NavLink to="/market">
            <FormattedMessage id="page.market" defaultMessage="市场" />
          </NavLink>
        </li>
        <li className="header-nav__item">
          <NavLink to="/detail/1">
            <FormattedMessage id="page.detail" defaultMessage="详情" />
          </NavLink>
        </li>
        {isAuth && (
          <li className="header-nav__item">
            <NavLink to="/detail/2">
              <FormattedMessage id="page.detail2" defaultMessage="详情 2" />
            </NavLink>
          </li>
        )}
      </ol>
      <ol className="header-nav__right">
        <li className="header-nav__item">
          <a href="//www.domain.com:3000">English</a>
          &nbsp;/&nbsp;
          <a href="//zh.domain.com:3000">中文</a>
        </li>
      </ol>
    </nav>
  </header>
)

export default Header
