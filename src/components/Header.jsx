import './Header.scss'
import Logo from './Logo'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header id="App_header" className="text-center">
      <Logo style={{width:'80px', margin:'1rem 1.5rem'}}></Logo>
      <nav id="App_nav">
        <ul>
          <li>
            <p>제작</p>
          </li>
          <li>
            <p>모두의 디자인</p>
          </li>
          <li>
            <p>리뷰</p>
          </li>
          <li>
            <p>문의하기</p>
          </li>
        </ul>
      </nav>
      <div>
        <ul id="main_subnav" className="caption">
          <li><FontAwesomeIcon icon={solid('magnifying-glass')} size="2x" /></li>
          <li><FontAwesomeIcon icon={solid('cart-shopping')} size="2x" /></li>
          <li><FontAwesomeIcon icon={solid('user')} size="2x" /></li>
        </ul>
      </div>
    </header>
  );
};

export default Header