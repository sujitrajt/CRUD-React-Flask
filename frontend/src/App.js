
import './App.css';
import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ImageUpload from './ImageUpload'
import { Route, Router, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
function App() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [addContact, setAddContact] = useState(false)
  const [updateContact,setUpdateContact] = useState(false)
  const [currentContact,setCurrentContact] = useState({})
  const [isLogin, setIsLogin] = useState(false)
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
    console.log("add")
    setAddContact(true)
    console.log(addContact)
    navigate("/contactForm")

  }
  const onContactUpdate = (contact) => {
    // console.log(contact)
    setUpdateContact(true)
    setCurrentContact(contact)
    navigate("/contactForm")
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/contacts' element ={<ContactList contacts={contacts} addContact={displayForm}  updateCallback={onUpdate} updateContact={onContactUpdate}/>}/>
        <Route path='/image' element={<ImageUpload/>}/>
        <Route path='/contactForm' element ={<ContactForm currentContact={currentContact} updateCallback={onUpdate} isUpdate={updateContact} addContact={addContact}/>}/>
        <Route path='/register' element={<Register/>}/>

      </Routes>
      {/* <ContactList contacts={contacts} updateCallback={onUpdate} updateContact={onContactUpdate}/> */}
       {/* {!addContact && !updateContact ? (<button onClick={displayForm}>Add Contact</button>) : ( <ContactForm currentContact={currentContact} updateCallback={onUpdate} isUpdate={updateContact}/>)} */}
      {/* {updateContact  ?(<ContactForm updateCallback={onUpdate} currentContact={currentContact} isUpdate={updateContact}/>):<></>} */}

    </div>
  );
}

export default App;
