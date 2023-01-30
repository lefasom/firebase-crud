import React, { useState, useEffect } from 'react'
import { db } from './firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";

import './App.css'

function App() {


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value })
	}

	const initialStateValues = {
		name: '',
		lunes: '',
		martes: '',
		miercoles: '',
		jueves: '',
		viernes: '',
		sabado: '',
		domingo: ''
	}

	const collectionName = "calendario"
	const [registros, setRegistros] = useState([])
	const [ values, setValues ] = useState(initialStateValues)

	const handleSubmit = async (e) => {
		e.preventDefault()
		await addDoc(collection(db, collectionName), values);
	}
	  	

	const getLinks = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const docs = [];

    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    setRegistros(docs);
  
  };


	useEffect(() => {
		getLinks()
	})

  const onDeleteLink = async (id) => {
      await deleteDoc(doc(db, collectionName, id))
  };

	return (
		<>
		<h1>Formulario</h1>
			<form onSubmit={handleSubmit}>
				<div className="containerpro">
					<div className="container">
						<div className="dias">
							 <h4>Lunes</h4>
							 <select name='lunes' onChange={handleInputChange}>
								 <option>Ninguno</option>
								 <option>Mañana</option>
								 <option>Tarde</option>
								 <option>Noche</option>
							 </select>
						</div>
				  	<div className="dias">
							 <h4>Martes</h4>
							 <select name='martes' onChange={handleInputChange}>
								 <option>Ninguno</option>
								 <option>Mañana</option>
								 <option>Tarde</option>
								 <option>Noche</option>
							 </select>
						</div>
						<div className="dias">
							 <h4>Miercoles</h4>
							 <select name='miercoles' onChange={handleInputChange}>
								 <option>Ninguno</option>
								 <option>Mañana</option>
								 <option>Tarde</option>
								 <option>Noche</option>
							 </select>
						</div>
						<div className="dias">
							 <h4>Jueves</h4>
							 <select name='jueves' onChange={handleInputChange}>
								 <option>Ninguno</option>
								 <option>Mañana</option>
								 <option>Tarde</option>
								 <option>Noche</option>
							 </select>
						</div>
						<div className="dias">
							 <h4>Viernes</h4>
							 <select name='viernes' onChange={handleInputChange}>
								 <option>Ninguno</option>
								 <option>Mañana</option>
								 <option>Tarde</option>
								 <option>Noche</option>
							 </select>
						</div>
						<div className="dias">
							 <h4>Sabado</h4>
							 <select name='sabado' onChange={handleInputChange}>
								 <option>Ninguno</option>
								 <option>Mañana</option>
								 <option>Tarde</option>
								 <option>Noche</option>
							 </select>
						</div>
						<div className="dias">
							 <h4>Domingo</h4>
							 <select name='domingo' onChange={handleInputChange}>
								 <option>Ninguno</option>
								 <option>Mañana</option>
								 <option>Tarde</option>
								 <option>Noche</option>
							 </select>
						</div>
					</div>
					<div className="miName">
					  <h4>Mi Nombre</h4>
						<input name='name' type="text" onChange={handleInputChange}/>
						<button>Registrar</button>
					</div>
				</div>
			</form>
			
					<h2>Registrados</h2>
					<div className="nombre">
					{registros.map((val)=>{
						return(
								<div key={val.id}>
									<p>{val.name}</p>
									<button onClick={()=>onDeleteLink(val.id)}>X</button>
								</div>
						)
					})}
					</div>
				


			 
		</>
	
	)
}

export default App
