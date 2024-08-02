
import './App.css';
import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
function App() {
  const [contacts, setContacts] = useState([])
  const [addContact, setAddContact] = useState(false)
  const [updateContact,setUpdateContact] = useState(false)
  const [currentContact,setCurrentContact] = useState({})
  useEffect(() => {
    getContacts()
  },[])
  const getContacts = async () => {
    const response = await fetch("http://127.0.0.1:5001/contacts")
    const data = await response.json()
    console.log(data)
    setContacts(data.contacts)
  }
  const onUpdate = () => {
    getContacts()
    setAddContact(false)
    setUpdateContact(false)
  }
  const displayForm = () => {
    if(addContact){
      setAddContact(false)
    }else{
      setAddContact(true)
    }
  }
  const onContactUpdate = (contact) => {
    // console.log(contact)
    setUpdateContact(true)
    setCurrentContact(contact)
  }
  return (
    <div>
      <ContactList contacts={contacts} updateCallback={onUpdate} updateContact={onContactUpdate}/>
      {!addContact && !updateContact ? (<button onClick={displayForm}>Add Contact</button>) : ( <ContactForm currentContact={currentContact} updateCallback={onUpdate} isUpdate={updateContact}/>)}
      {/* {updateContact  ?(<ContactForm updateCallback={onUpdate} currentContact={currentContact} isUpdate={updateContact}/>):<></>} */}
    </div>
  );
}

export default App;
