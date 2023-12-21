import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const dotenv=require("dotenv");
dotenv.config();

const HOST=process.env.HOST;

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${HOST}/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });

        const json=await response.json();
        // console.log(json);
        setCredentials({email:"",password:""});
        
        if(json.success)
        {
            localStorage.setItem('token',json.authToken);
            props.showAlert("You are Logged in Successfully","success");
            navigate('/');
        }

        else
        {
            props.showAlert("Invalid Credentials","danger");
        }


    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }


    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login;