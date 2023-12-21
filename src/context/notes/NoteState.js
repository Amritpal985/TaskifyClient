import NoteContext from "./noteContext";
import { useState } from "react";

const dotenv=require("dotenv");
dotenv.config();

const HOST=process.env.HOST;

const NoteState=(props)=>{
    const notesInitial=[]

    const [notes, setNotes] = useState(notesInitial);

    // get all notes
    const getAllNotes=async ()=>{

        const response=await fetch(`${HOST}/api/notes/fetchallnotes`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token"),
            }
        });
        
        const json=await response.json();
        console.log(json);
        setNotes(json);


    }

    // add a note
    const addNote=async (title,description,tag)=>{

        const response=await fetch(`${host}/api/notes/addnote`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token"),
            },
            body:JSON.stringify({title,description,tag})
        });
        
        const note=await response.json();
        // console.log(note);
        setNotes(notes.concat(note));

    }

    // delete a note
    const deleteNote=async(id)=>{
        // console.log(id);
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token"),
            }
        });
        const json=await response.json();
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }

    // edit a note
    const editNote=async (id,title,description,tag)=>{
        
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token"),
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=await response.json();
        let newNotes=JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id)
            {
                // console.log("updating");
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
        }
        setNotes(newNotes);
        // console.log(notes);

    }


    return (
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;