import React from 'react'

function Register() {
    return (
        <div>{localStorage.getItem("token")}</div>
    )
}

export default Register