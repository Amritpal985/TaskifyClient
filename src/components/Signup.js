import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const dotenv=require("dotenv");
dotenv.config();

const HOST=process.env.HOST;


const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:"",confirm_password:""});
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${HOST}/api/auth/createUser`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGVmMDBjZjg0YWQ2OTQzZTgxNmViIn0sImlhdCI6MTY3NDYzODI5NH0.0xtXhO38f94W5GU4ATE8tdW9QIvdivEqihfix6lIEuU",
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });

        const json=await response.json();

        if(json.success)
        {
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.showAlert("Account created successfully","success");
        }

        else
        {
            props.showAlert("Invalid Enteries","danger");
        }



    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onchange} value={credentials.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onchange} value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={credentials.password} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm_password" name="confirm_password" onChange={onchange} value={credentials.confirm_password}  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup