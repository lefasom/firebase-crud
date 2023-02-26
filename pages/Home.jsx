import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { db, uploadFile } from '../src/firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";

function Home() {
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
	const onDeleteLink = async (id) => {
		await deleteDoc(doc(db, collectionName, id))
	};

	useEffect(() => {
		getLinks()
	})
    
  return (
    <div>
        <Link to="/Form">New</Link>
		<div className="nombre">
        	<h2>Registrados</h2>
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
    </div>

  )
}

export default Home