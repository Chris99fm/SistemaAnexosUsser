import './Usuario.css'
import 
{ useNavigate,
  useLocation
} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import json from '../../configuration/API_Port.json'

function Usuario() {

  const [colaborador, setcolaborador] = React.useState('');
  const [elemento, setelemento] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();

  async function loadColaborador(){
    const urlparams = new URLSearchParams(location.search);
    const id = urlparams.get("id");
    const data ={
      Id_Colaborador: id
    };
    const result = await axios.post("http://"+json.SITE+":"+json.PORT+"/getColaboradorById/", data);
    //console.log(id)
    setcolaborador(result.data)
  }
  function loadElementos(){
    //console.log("cargando")
    if (!colaborador) return;
    //console.log("Tiene colaborador")
    const displayOptions = []
      displayOptions.push(
        <div key={colaborador["Id_Colaborador"]} className='Colaborador'>
          <div className='contenedorInfo'>
            <div className='detallesColab'>
              <div className='titulo'>Detalles del Colaborador</div>
              <div className='TextoColaborador space-y-3'>
                <div className='desc'>Rut:</div>
                <div id='Rut'>{colaborador['Rut']}</div>
                <div className='desc'>Nombre:</div>
                <div id='Nombres'>{colaborador['Nombres']} {colaborador['Apellidos']}</div>
                <div className='desc'>Correo:</div>
                <div id='Correo'>{colaborador['Email']}</div>
              </div>
            </div>
            <div className='detallesColab'>
              <div className='titulo'>Detalles de la Empresa</div>
              <div className='TextoColaborador space-y-3'>
                <div className='desc'>Empresa:</div>
                <div id='Empresa'>{colaborador['Razon_Social']}</div>
                <div className='desc'>Area:</div>
                <div id='Area'>{colaborador['Area']}</div>
                <div className='desc'>Cargo:</div>
                <div id='Cargo'>{colaborador['Cargo']}</div>
                <div className='desc'>Anexo:</div>
                <div id='Anexo'>{colaborador['Anexo']}</div>
              </div>
            </div>
          </div>
          <div className='ImgColaborador'>
            <img id={colaborador['Id_Imagen']} src={colaborador['Imagen']}></img>
          </div>
        </div>
      )
      setelemento(displayOptions)
    }
  React.useEffect(() =>{
    if(!elemento) loadElementos()
  },[elemento,colaborador])
  React.useEffect(() =>{
    loadColaborador()
  }, [])

  return (
    <div className="Usuario">
        { elemento }
    </div>
  );
}

export default Usuario;