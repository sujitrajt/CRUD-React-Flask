import React from "react";
import "./ContactList.css"
const ContactList = ({contacts,updateCallback,updateContact}) => {
    const onDelete = async(id) => {
        try{
            const options = {
                method : "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5001/delete_contact/${id}`, options)
            if (response.status === 200){
                updateCallback()
            } else{
                console.error("Failed to Delete")
            }
        } catch(error) {
            console.log(error)
        }
    }
    const onUpdate = (contact) => {
        updateContact(contact)
    }
    return(
        <div className="contact-list">
            <h2 className="color">Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button onClick={() => onUpdate(contact)}>Update</button>
                                <button onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList