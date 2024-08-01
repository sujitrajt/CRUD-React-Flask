
import './App.css';
import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
function App() {
  const [contacts, setContacts] = useState([])
  const [addContact, setAddContact] = useState(false)
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
  }
  const displayForm = () => {
    if(addContact){
      setAddContact(false)
    }else{
      setAddContact(true)
    }
  }
  return (
    <div>
      <ContactList contacts={contacts} updateCallback={onUpdate}/>
      {!addContact ? (<button onClick={displayForm}>Add Contact</button>) : ( <ContactForm  updateCallback={onUpdate}/>)}
    </div>
  );
}

export default App;
