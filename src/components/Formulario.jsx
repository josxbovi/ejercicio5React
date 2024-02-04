import { Button, Form } from "react-bootstrap";
import ListaDeTareas from "./ListaDeTareas";
import { useEffect, useState } from "react";

const Formulario = () =>{
  const[Tarea , setTarea]=useState("");
  const [ListaTareas, setListaTareas]=useState([]);
  useEffect(() => {
    const tareasGuardadas=localStorage.getItem("tareas");
    if(tareasGuardadas){
      setListaTareas(JSON.parse(tareasGuardadas));
    }
    }, []);
    const AgregarTarea = (e) =>{
        e.preventDefault();
        const nuevasTareas = [...ListaTareas, Tarea];
        setListaTareas([...ListaTareas, Tarea]);
        localStorage.setItem("tareas", JSON.stringify([...ListaTareas, Tarea]));
        setTarea("");
    };

    const eliminarTarea = (index) =>{
        const nuevasTareas = [...ListaTareas];
        nuevasTareas.splice(index, 1);
        setListaTareas(nuevasTareas);
        localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    };

  return (
    <section>
      <Form onSubmit={AgregarTarea}>
        <Form.Group className="mb-5 d-flex" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Ingresa tu tarea"
            minLength={3}
            maxLength={50}
            onChange={(e)=> {setTarea(e.target.value)}}
            value={Tarea}
          />
          <Button variant="warning" className="ms-2" type="submit">
            Agregar
          </Button>
        </Form.Group>
      </Form>
      <ListaDeTareas tareas={ListaTareas} eliminarTarea={eliminarTarea}/>
    </section>
  );
};

export default Formulario;
