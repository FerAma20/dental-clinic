import { useState, useEffect } from "react"
import Swal from "sweetalert2"

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [alta, setAlta] = useState('')
  const [sintomas, setSintomas] = useState('')
 

  useEffect(() => {
      if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setAlta(paciente.alta)
        setSintomas(paciente.sintomas)

      }
  },[paciente])



  const generarId = () => {

    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const hendleSubmit = (e) => {
    e.preventDefault()

    //Validación del formulario
    if([nombre, propietario, email, alta, sintomas].includes("")){
      Swal.fire({
        title: 'Datos Incompletos',
        text: 'Hay almenos un campo vacío',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return

    }

      const objCita = {
        nombre, 
        propietario, 
        email, 
        alta, 
        sintomas
      }

      if(paciente.id){
        //Editando paciente
        objCita.id = paciente.id

        const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id ===
          paciente.id? objCita : pacienteState)
          setPacientes(pacientesActualizado)
          setPaciente({})

          Swal.fire({
            title: 'Edicion Exitosa',
            text: 'Todos los datos han sido editados exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          })
      }
      else
      {
        objCita.id = generarId()
        setPacientes([...pacientes, objCita])

        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Todos los datos han sido registrado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
      

      //Reiniciar valores del formulario
      setNombre('')
      setPropietario('')
      setEmail('')
      setAlta('')
      setSintomas('')
    }
  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form onSubmit={hendleSubmit}
      className="bg-white shadow-md rounded-lg py-8 px-5 mb-10">
        <div className="mb-5">
          <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input 
          id="nombre"
          type="text"
          placeholder="Nombre de la mascota"
          className="border-2 w-full p-1 mt-2 placeholder-gray-400 rounded-md"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="nombrePropietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input 
          id="nombrePropietario"
          type="text"
          placeholder="Nombre del propietario"
          className="border-2 w-full p-1 mt-2 placeholder-gray-400 rounded-md"
          value={propietario}
          onChange={(e) => setPropietario(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input 
          id="email"
          type="text"
          placeholder="Email Contacto Propietario"
          className="border-2 w-full p-1 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Alta
          </label>
          <input 
          id="alta"
          type="date"
          placeholder="Email Contacto Propietario"
          className="border-2 w-full p-1 mt-2 placeholder-gray-400 rounded-md"
          value={alta}
          onChange={(e) => setAlta(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          
          <textarea
          id="sintomas"
          placeholder="Describe los Síntomas"
          className="border-2 w-full p-1 mt-2 placeholder-gray-400 rounded-md"
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white font-bold uppercase hover:bg-indigo-700 cursor-pointer transition-all"
        value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}/>
      </form>
    </div>
  )
}

export default Formulario