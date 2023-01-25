import './Tabla.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import mas from '../../img/mas.png';
import json from '../../configuration/API_Port.json'


function Tabla() {

  const navigate = useNavigate();
  const [colaboradores, setcolaboradores] = React.useState('');
  const [elementotablas, setelementotablas] = React.useState();
  const [busqueda, setbusqueda] = React.useState({
    Nombres:""
    ,Apellidos:""
    ,Area:""
    ,Cargo:""
    ,Id_Empresa:""
    ,Id_Estado:""
  });
  const [empresas, setEmpresas] = React.useState('');
  const [options, setOptions] = React.useState('');
  
  async function loadEmpresas(){
      const out = (await (axios.get("http://"+json.SITE+":"+json.PORT+"/getEmpresas/"))).data
      //console.log(nombreVariableRetorno.recordset)
      setEmpresas(out)
  }

  function loadOptions(){
    if (!empresas) return;
    const displayOptions = []

    for (const option of empresas){
      displayOptions.push(
        <option key={option["Id_Empresa"]} value={option["Id_Empresa"]}> {option["Razon_Social"]} </option>
      )
    }

    setOptions(displayOptions)
    
  }

  

  React.useEffect(() =>{
    if(!options) loadOptions()
  })


  React.useEffect(() =>{
    loadEmpresas()
  }, [])
  React.useEffect(() => {
    //console.log(busqueda)
    loadElementos()
  }, [busqueda])

  async function loadColaboradores(){
    const out = (await (axios.get("http://"+json.SITE+":"+json.PORT+"/getListaColaboradores/"))).data
    //console.log(out)
    setcolaboradores(out)
  }
  

  function loadElementos(){
    if (!colaboradores) return;
    const displayOptions = []
    let colaboradoresfiltrados = colaboradores
    colaboradoresfiltrados = colaboradoresfiltrados.filter((colab)=> colab["Nombres"].toLowerCase().includes(busqueda.Nombres.toLowerCase()))
    colaboradoresfiltrados = colaboradoresfiltrados.filter((colab)=> colab["Apellidos"].toLowerCase().includes(busqueda.Apellidos.toLowerCase()))
    colaboradoresfiltrados = colaboradoresfiltrados.filter((colab)=> colab["Area"].toLowerCase().includes(busqueda.Area.toLowerCase()))
    colaboradoresfiltrados = colaboradoresfiltrados.filter((colab)=> colab["Cargo"].toLowerCase().includes(busqueda.Cargo.toLowerCase()))
    colaboradoresfiltrados = colaboradoresfiltrados.filter((colab)=> colab["Id_Empresa"] === parseInt(busqueda.Id_Empresa) || busqueda.Id_Empresa === '')
    colaboradoresfiltrados = colaboradoresfiltrados.filter((colab)=> colab["Id_Estado"] === parseInt(busqueda.Id_Estado) || busqueda.Id_Estado === '')

    for (const elemento of colaboradoresfiltrados){
      displayOptions.push(
        <tr key={elemento["Id_Colaborador"]} className='ElementoTabla' onClick={()=>  navigate(`/Colaborador?id=${elemento["Id_Colaborador"]}`)}>
              <td data-label="Nombres">{elemento["Nombres"]}</td>
              <td data-label="Apellidos">{elemento["Apellidos"]}</td>
              <td data-label="Anexo">{elemento["Anexo"]}</td>
              <td data-label="Empresa">{elemento["Razon_Social"]}</td>
              <td data-label="Area">{elemento["Area"]}</td>
              <td data-label="Cargo">{elemento["Cargo"]}</td>
              <td data-label="Correo">{elemento["Email"]}</td>
              {
                elemento["Id_Estado"] === 0 ?
                  <td data-label="Estado">Activo</td>
                :
                  <td data-label="Estado">Inactivo</td>
              }
        </tr>
      )
    }

    setelementotablas(displayOptions)
    
  }
  React.useEffect(() =>{
    if(!elementotablas) loadElementos()
  })


  React.useEffect(() =>{
    loadColaboradores()
  }, [])

  return (
    <div className='Tabla'>
      <div className="Header">
        <div id="BarraBusqueda">
            <input type="search" id="nombre" placeholder='Nombres' onChange={(e)=> setbusqueda(busqueda=>({...busqueda, ...{Nombres: e.target.value} }))} maxLength="60" className='elemento'></input>
            <input type="search" id="apellido" placeholder='Apellidos' onChange={(e)=> setbusqueda(busqueda=>({...busqueda, ...{Apellidos: e.target.value} }))} maxLength="60" className='elemento'></input>
            <input type="search" id="area" placeholder='Area' onChange={(e)=> setbusqueda(busqueda=>({...busqueda, ...{Area: e.target.value} }))} maxLength="60" className='elemento'></input>
            <input type="search" id="cargo" placeholder='Cargo' onChange={(e)=> setbusqueda(busqueda=>({...busqueda, ...{Cargo: e.target.value} }))} maxLength="60" className='elemento'></input>
            <select id="empresas" name="empresas" onChange={(e)=> setbusqueda(busqueda=>({...busqueda, ...{Id_Empresa: e.target.value} }))}>
              <option value="">Seleccione La Empresa</option>
              { options }
            </select>
            <select className='selecEstado' name="Estado" onChange={(e)=> setbusqueda(busqueda=>({...busqueda, ...{Id_Estado: e.target.value} }))}>
              <option value="">Filtrar por estado del Colaborador</option>
              <option value="0">Activo</option>
              <option value="1">Inactivo</option>
            </select>
        </div>
      </div>
      <div className="Tablita">
        <table>
          <thead>
            <tr>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Anexo</th>
              <th scope="col">Empresa</th>
              <th scope="col">Area</th>
              <th scope="col">Cargo</th>
              <th scope="col">Correo</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            { elementotablas }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tabla;