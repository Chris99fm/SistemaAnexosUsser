import './UpdateColab.css'
import 
{ useNavigate,
  useLocation
} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import img from '../../img/default.png'
import Usuario from '../Usuario/Usuario';

function UpdateColab() {
    const [imgperfil, setimgperfil] = React.useState(img);
    const [empresas, setEmpresas] = React.useState('');
    const [options, setOptions] = React.useState('');
    const [usuario, setUsuario] = React.useState({
        Id_Colaborador:"",
        Rut:"",
        Nombres:"",
        Apellidos:"",
        Area:"",
        Cargo:"",
        Anexo:"",
        Email:"",
        Id_Empresa:"",
        Id_Estado:""
    });
    const [imagen, setImagen] = React.useState({
        Nombre_imagen:"",
        Imagen:"",
        Tipo_Contenido:""
    });
    const[colab,setColab] = React.useState({
        Rut:"",
        Nombres:"",
        Apellidos:"",
        Area:"",
        Cargo:"",
        Anexo:"",
        Email:"",
        Id_Empresa:"",
        Id_Estado:"",
        Nombre_imagen:"",
        Imagen:"",
        Tipo_Contenido:""
    });
    const location = useLocation();
    const urlparams = new URLSearchParams(location.search);
    const id = urlparams.get("id");

    async function RegistrarUsuario(){
        if(usuario.Id_Empresa == 0){
            alert("Seleccione Una Empresa");
            return;
        }
        if(imagen.Imagen == ''){
            alert("Seleccione Una Imagen");
            return;
        }
        if(imagen.Id_Estado == 'Null'){
          alert("Seleccione un Estado");
          return;
      }
        const data = {...usuario,...imagen}
        const out = await (axios.post("http://localhost:8081/UpdateColaborador/", data));
        alert(out.data)
    }
    async function HandleImage(element, event){
        const imgRaw = event.target.files[0]
        setimgperfil(URL.createObjectURL(imgRaw))
        const tipo = imgRaw.type.split("/")[1];
        const imgbase64 = await encodeImageFileAsURL(imgRaw)
        const imgdata = {
            Nombre_imagen:"ProfilePicture."+tipo,
            Imagen:imgbase64,
            Tipo_Contenido:imgRaw.type
        }
        setImagen(imgdata)
    }
    async function LoadDefaulImage(imgdata){
        setimgperfil(imgdata.Imagen)
        setImagen(imgdata)
    }
    async function encodeImageFileAsURL(imgRaw) {
        var resultBase64 = ""
        var file = imgRaw;
        var reader = new FileReader();
        reader.onloadend = function() {
          resultBase64 = reader.result
        }
        const dataURL = reader.readAsDataURL(file);
         return await new Promise(function (resolve, reject) {
          const interval = setInterval(()=>{
            if(resultBase64 != "")  {
              resolve(resultBase64)
              clearInterval(interval)
            }
          }, 50)
            
          });
    }
    async function loadEmpresas(){
        const out = (await (axios.get("http://localhost:8081/getEmpresas/"))).data
        setEmpresas(out)
    }
    async function loadColaborador(){
        const data ={
            Id_Colaborador: id
          };
        const out = await axios.post('http://localhost:8081/getColaboradorById/', data);
        setColab(out.data)
        setUsuario(Usuario=>({...Usuario, ...{Id_Colaborador: out.data.Id_Colaborador} }))
        setUsuario(Usuario=>({...Usuario, ...{Rut: out.data.Rut} }))
        setUsuario(Usuario=>({...Usuario, ...{Nombres: out.data.Nombres} }))
        setUsuario(Usuario=>({...Usuario, ...{Apellidos: out.data.Apellidos} }))
        setUsuario(Usuario=>({...Usuario, ...{Area: out.data.Area} }))
        setUsuario(Usuario=>({...Usuario, ...{Cargo: out.data.Cargo} }))
        setUsuario(Usuario=>({...Usuario, ...{Anexo: out.data.Anexo} }))
        setUsuario(Usuario=>({...Usuario, ...{Email: out.data.Email} }))
        setUsuario(Usuario=>({...Usuario, ...{Id_Empresa: out.data.Id_Empresa} }))
        setUsuario(Usuario=>({...Usuario, ...{Id_Estado: out.data.Id_Estado} }))
        const imgdata = {
            Nombre_imagen:out.data.Nombre_imagen,
            Imagen: out.data.Imagen,
            Tipo_Contenido: out.data.Tipo_Contenido
        }
        LoadDefaulImage(imgdata)
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
      loadColaborador()
    }, [])

    return(
        <div className="UpdateColaborador">
          <div className='secImg'>
            <label htmlFor="archivo">
                <span className='imgcolab'><img src={imgperfil} alt="" /></span>
                <input type="file" id='archivo' className='inputimg' onChange={(e)=> HandleImage(this,e)}/>
            </label>
          </div>
          <div className='secInfo'>
            {/*<div className={`${usuario.Id_Estado===1?'text-red-500':'text-green-500'} titulo`}>Datos del Colaborador</div>*/}
            <div className='titulo'>Datos del Colaborador</div>
            <input type="text" className='formAgregar' defaultValue={colab.Rut} placeholder='Ingrese el Rut' onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Rut: e.target.value} }))}/>
            <input type="text" className='formAgregar' defaultValue={colab.Nombres} placeholder='Ingrese los Nombres' onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Nombres: e.target.value} }))}/>
            <input type="text" className='formAgregar' defaultValue={colab.Apellidos} placeholder='Ingrese los Apellidos' onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Apellidos: e.target.value} }))}/>
            <input type="text" className='formAgregar' defaultValue={colab.Email} placeholder='Ingrese el Correo' onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Email: e.target.value} }))}/>
            <select name="Estado" id="Estado" value={usuario.Id_Estado} onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Id_Estado: e.target.value} }))}>
              <option value="Null">Ingrese el Estado del Colaborador</option>
              <option value="0">Activo</option>
              <option value="1">Inactivo</option>
            </select>
          </div>
          <div className='secInfo2'>
            <div className='textAgregar'>
              <div className='titulo'>Datos de la Empresa</div>
              <select id="empresasAdd" value={usuario.Id_Empresa} className='formAgregar' name="empresas" onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Id_Empresa: e.target.value} }))}>
                  <option value="0">Selecione La Empresas</option>
                  { options }
              </select>
              <input type="text" className='formAgregar' defaultValue={colab.Area} placeholder='Ingrese el Area' onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Area: e.target.value} }))}/>
              <input type="text" className='formAgregar' defaultValue={colab.Cargo} placeholder='Ingrese el Cargo' onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Cargo: e.target.value} }))}/>
              <input type="text" className='formAgregar' defaultValue={colab.Anexo} placeholder='Ingrese el Anexo' onChange={(e)=> setUsuario(Usuario=>({...Usuario, ...{Anexo: e.target.value} }))}/>
            </div>
            <div className='botones'>
              <input type="button" className='botonAgregar' onClick={()=> RegistrarUsuario()} value="Actualizar" />
            </div>
          </div>

        </div>
    );
}

export default UpdateColab