import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"

function App() {
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})


  useEffect(() =>{
      const obtenerLS = () =>{

        const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
      }

      obtenerLS()
  }, [])

  useEffect(() =>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = (id) =>{

    Swal.fire({
      title: '¿Deseas eliminar el paciente?',
      text: "Al confirmar esta accion se eliminara el paciente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        const pacientesActualizado = pacientes.filter(item => item.id !== id )
        setPacientes(pacientesActualizado)
        Swal.fire(
          'Eliminado Exitosamente',
          'Se ha eliminado el paciente exitosamente',
          'success'
        )
      }
    })
  }

  return (
    <div className="container mx-auto mt-20">
    <Header/>
    <div className="mt-12 md:flex">

    <Formulario
    pacientes = {pacientes}
    setPacientes = {setPacientes}
    paciente = {paciente}
    setPaciente = {setPaciente}
    />
    <ListadoPacientes
    pacientes = {pacientes}
    setPaciente = {setPaciente}
    eliminarPaciente = {eliminarPaciente}
    />

    </div>
    </div>
  )
}

export default App
