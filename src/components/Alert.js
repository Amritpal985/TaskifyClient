import React from 'react'

export default function Alert(props) {

    const capitalizeMessage=(txt)=>{
        return txt.charAt(0).toUpperCase()+txt.slice(1);
    }

    return (
        <div style={{height:"40px"}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalizeMessage(props.alert.type)}</strong>: {props.alert.msg}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}
