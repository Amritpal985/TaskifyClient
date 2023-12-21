import React from 'react'
import Notes from './Notes'
import NoteContext from "../context/notes/noteContext";
import { useContext,useState } from 'react'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { notes, addNote } = context;
    const [note, setNote] = useState({title:"",description:"",tag:""});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note added successfully","success");
    }
    
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }



    return (
        <div>
            <div className='container my-2'>
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name="description" id="description" value={note.description}  onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
            <div className='container my-3'>
                <h3 >Your Notes</h3>
            </div>
        </div>
    )
}

export default AddNote