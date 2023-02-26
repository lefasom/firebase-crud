import React, { useState } from 'react'
import { db, uploadFile } from '../src/firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

function Form() {

	const collectionName = "crudImg"
	const [name, setName ] = useState('')
	const [photo, setPhoto ] = useState('')
	const navigate = useNavigate()
	

	const handleSubmit = async () => {
		await addDoc(collection(db, collectionName), {name,photo});
		navigate('/')
	}

  return (
        
	<div className="containerpro">
		<div className="miName">
			<input type="file" name="" id="" onChange={async(e)=>{
				const result = await uploadFile(e.target.files[0])
				setPhoto(result)
			}}/>
			<h4>Mi Nombre</h4>
			<input name='name' type="text" onChange={(e)=>setName(e.target.value)}/>
			<h4>Mi Foto</h4>
			<button 
			onClick={
				()=>{handleSubmit()}}
			>
				Registrar
			</button>
		</div>
	</div>
  )
}

export default Form