import './Header.css'
import React from 'react';
import axios from 'axios';
import mas from '../../img/mas.png';
import 
{ useNavigate,
  useLocation
} from 'react-router-dom';
import flecha from '../../img/flechav1.png'
import MessageManager from '../../CustomScripts/MessageManager'

function Header() {
  const [msg, setmsg] = React.useState(MessageManager.showMsg())
  React.useEffect(()=>{
    const interval = setInterval(() => {
      setmsg(MessageManager.showMsg())
    },100);
  },[])
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
    return(
        <div className='HeadVistaUsr'>
            {
                path==='/'?
                <div></div>
                :
                <img id='flecha'src={flecha} alt="" onClick={()=>  navigate(`/`)}/>
            }
            <div id='titulo'>Sistema de Anexos</div>
            {
                path==='/'?
                <div className='msgHome'>{msg}</div>
                :
                <div className='msgNormal'>{msg}</div>
            }
        </div>
    );
}

export default Header;