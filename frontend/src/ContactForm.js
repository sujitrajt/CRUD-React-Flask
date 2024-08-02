import React from "react";
import { useState } from "react";
const ContactForm = ({updateCallback,currentContact,isUpdate}) => {
    // console.log(isUpdate)
    const [firstName,setFirstName] = useState(currentContact.firstName || "")
    const [lastName,setLastName] = useState(currentContact.lastName || "")
    const [email,setEmail] = useState(currentContact.email || "")
    const onSubmit = async(e) => {
        e.preventDefault()
        const data = {
            firstName,
            lastName,
            email
        }
        console.log(data)
        const url = "http://127.0.0.1:5001/" +(isUpdate ? `update_contact/${currentContact.id}`:"create_contact")
        const options = {
            method : isUpdate? "PATCH" : "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url,options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
            console.log(response.status)
        }       
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            {isUpdate ? (<button type="submit">Update Contact</button>):(<button type="submit">Create Button</button>)}
        </form>
    )
}

export default ContactForm