import  { useRef, useState , KeyboardEvent  } from 'react';
import assest from '../../../assets/imges';
import '../../../scss/pages/home/_navbar.scss';
import Bar from './Bar';
import Dropmenu from './Dropmenu';
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import Shadow from '../../shered/Shadow';
import { setshearchvalue } from '../../../store/shearchvalue';
import Daynamicknote from '../../shered/Daynamicknote';
import useWindowSize from '../../../hooks/useWindowSize';
import Suggetsearch from './Suggetsearch';
import useClickOutside from '../../../hooks/useclickoutside';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sheachclick , setsheachclick] = useState<boolean>(false);
  const [showsearch , setshowsearch] = useState<boolean>(false)
  const dispatch = useDispatch();
  const shearchref = useRef<HTMLDivElement >(null);
  const cart = useSelector((state:any) => state.cart);
  const searchvalue = useSelector((state:any) => state.shearchvalue);  
  const Navigate =  useNavigate();
  const size = useWindowSize()

  const handleBurgerClick = () =>  {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelclickshearch = () => {
    setsheachclick(prev => (!prev))
  }

  const handeltoggol = () => {
    setsheachclick(false)
    setshowsearch(false)
  }

  const Ref = useClickOutside(handeltoggol)

  const handelpresenter = (e:KeyboardEvent) => {
    if (e.key === 'Enter') {
    if (sheachclick && searchvalue.length > 3) {
    handelclickshearch()
    Navigate('shearch')
    }
    }
  }

  const handelsearchclicksmaalsize = () => {
    setshowsearch(true);
    setsheachclick(true)
  }

  return (
    <>
    {sheachclick && <Shadow />}
    <Bar />
    <div className="navbar">
    <div className="logo_container">
          <div>
            <img
              src={assest.burger}
              alt="burger"
              className="burger"
              style={{ cursor: 'pointer' }}
              onClick={handleBurgerClick}
            />
            {isMenuOpen && <Dropmenu onclick = {handleBurgerClick} />}
          </div>
          <Link to={"/"}>
          <img src={assest.logo} alt="logo" className="logo" />
          </Link>
    </div>
    {size.width && size.width > 1000 ? 
    <div ref={Ref} onClick={handelclickshearch} onKeyDown={(e) => handelpresenter(e)} className={`search_product ${sheachclick ? "shearch_active" : ""}`}>
    <input onChange={(e) => dispatch(setshearchvalue(e.target.value)) } type="search" name="search_product" id="search" placeholder="ابحث عن المنتجات..." />
    <Suggetsearch changestate = {setsheachclick} />
    <img src={assest.shearch} alt="shearch" />
    </div>
    : showsearch ? 
    <div ref={shearchref} onClick={handelclickshearch} onKeyDown={(e) => handelpresenter(e)} className={`search_product ${sheachclick ? "shearch_active" : ""}`}>
    <input onChange={(e) => dispatch(setshearchvalue(e.target.value)) } type="search" name="search_product" id="search" placeholder="ابحث عن المنتجات..." />
    <img src={assest.shearch} alt="shearch" />
    </div> :""
   }
    <div className="icons">
    <img src={assest.shearch_black} alt="shearch" onClick={handelsearchclicksmaalsize} className="shearch" />
    <Daynamicknote path={'cart'} img={assest.bag} arraylength={cart.length} />
    <img onClick = {() => Navigate('userapage')}  src={assest.user} alt="user" />
    </div>
    </div>
    </>
  );
};

export default Navbar;