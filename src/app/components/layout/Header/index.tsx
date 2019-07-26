import React from "react";
import { Link } from "react-router-dom";
import "./style.less";

const isCurrent = (to, current) => {
  if (to === "/" && current === to) {
    return true;
  } else if (to !== "/" && current.includes(to)) {
    return true;
  }

  return false;
};

const HeaderLink: React.FC<{ to: string; current: string }> = ({
  to,
  children,
  current
}) => (
  <Link className={isCurrent(to, current) ? "current" : ""} to={to}>
    {children}
  </Link>
);

export interface HeaderProps {
  /** 当前路径 */
  current: string;
  /** 是否有权限 */
  isAuth: boolean;
}

/**
 * 应用Header导航
 */
const Header: React.FC<HeaderProps> = ({ current, isAuth }) => (
  <header className="header">
    <nav className="header-nav">
      <ol className="header-nav__left">
        <li className="header-nav__item">
          <HeaderLink to="/" current={current}>
            <span>Home</span>
          </HeaderLink>
        </li>
        <li className="header-nav__item">
          <HeaderLink to="/market" current={current}>
            <span>Market</span>
          </HeaderLink>
        </li>
        <li className="header-nav__item">
          <HeaderLink to="/detail/1" current={current}>
            <span>详细 1</span>
          </HeaderLink>
        </li>
        {isAuth && (
          <li className="header-nav__item">
            <HeaderLink to="/detail/2" current={current}>
              <span>详细 2</span>
            </HeaderLink>
          </li>
        )}
      </ol>
      <ol className="header-nav__right">
        <li className="header-nav__item">SignIn / Login</li>
      </ol>
    </nav>
  </header>
);

export default Header;
