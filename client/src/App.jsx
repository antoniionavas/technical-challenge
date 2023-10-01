import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';

//components
import PhoneList from './components/PhoneList'
import PhoneDetails from './components/PhoneDetails'

function App() {

  const [allPhones, setAllPhones] = useState(null)
  const [isLoading, setIsLoading] = useState(true) 
  const [phoneId, setPhoneId] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null) 

  useEffect(() => {
    getAllPhones()
  }, []) 

  //lista de todos los phones 
  const getAllPhones = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/phones/")
      console.log("La data", response)
      setTimeout(() => {
        setAllPhones(response.data)
        setIsLoading(false)
      }, 500)

    } catch(err) {
      setErrorMessage("Ha habido un error, inténtelo más tarde") 
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="Web">
        <Spinner animation="border" variant="info"/>
      </div>
      )
  }


  return (
    <>
      <div className="Web">
        <h3>Technical Challengue: App Phones</h3>

        <div id="page">
        <div id="phone-list">
          <PhoneList allPhones={allPhones} phoneId={phoneId} setPhoneId={setPhoneId}/>
        </div>

        <div id="phone-details">
          {
            phoneId !== null 
            ? <PhoneDetails phoneId={phoneId} setErrorMessage={setErrorMessage}/>
            : <h3>Click en cualquier terminal para ver sus detalles</h3>
          }
        </div>

      </div>
      </div>
    </>
  )
}

export default App
