import React from 'react'
import NoteContext from "../context/notes/noteContext";
import { useContext, useEffect,useRef,useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getAllNotes,editNote } = context;
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"General"});
    const ref = useRef(null);
    const refClose=useRef(null);
    const navigate=useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token"))
        {
            getAllNotes();
            // console.log(typeof notes);
        }
        else
        {
            navigate('/login');
        }
         // eslint-disable-next-line
    }, [])

    const updateNote=(currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
        
    }

    const handleClick=(e)=>{
        // e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        // addNote(note.title,note.description,note.tag); 
    }
    
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }


    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onchange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onchange} />
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button  ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}  >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                {/* {notes.length====0?"No notes available":} */}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes