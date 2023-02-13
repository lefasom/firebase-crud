import React, { useState, useEffect } from 'react'
import { db, uploadFile } from './firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";

import './App.css'

function App() {
	const initialStateValues = {
		name: '',
		photo: '',
		
	}
	const [ values, setValues ] = useState(initialStateValues)
	const [file, setFile ] = useState(null)
	const [name, setName ] = useState('')
	const [photo, setPhoto ] = useState('')



	const handleFile = async () => {
		try {
			const result = await uploadFile(file)
			setPhoto(result)
		} catch (error) {
			console.log(error)
		}
		
	}

	const handleSubmit = async () => {
		await addDoc(collection(db, collectionName), values);
	}
	  	

	const onDeleteLink = async (id) => {
		await deleteDoc(doc(db, collectionName, id))
	};
	
	const collectionName = "crudImg"
	const [registros, setRegistros] = useState([])

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
		setValues({
			name,
			photo,
			
		})
	})


	return (
		<>
		<h1>Formulario</h1>
			
				<div className="containerpro">
					<div className="miName">
						<input type="file" name="" id="" onChange={(e)=> setFile(e.target.files[0])}/>
						<button onClick={()=>handleFile()}>Subir Imagen</button>
						<h4>Mi Nombre</h4>
						<input name='name' type="text" onChange={(e)=>setName(e.target.value)}/>
						<h4>Mi Foto</h4>
						{/* <input name='photo' type="text" onChange={handleInputChange}/> */}
						<button onClick={()=>handleSubmit()}>Registrar</button>
					</div>
				</div>
			
			
					<h2>Registrados</h2>
					<div className="nombre">
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Foto</th>
								<th>Acciones</th>
							</tr>
						</thead>
						
						{registros.map((val)=>{
							return(
						<tbody key={val.id}>			
							<tr>
								<td>
									<p>{val.name}</p>
								</td>
								<td>
									<img src={val.photo} alt={val.name} />
								</td>
								<td>
									<button onClick={()=>onDeleteLink(val.id)}>X</button>
								</td>
							</tr>
						</tbody>			
									
							)
						})}
					</table>
					</div>
				


			 
		</>
	
	)
}

export default App
