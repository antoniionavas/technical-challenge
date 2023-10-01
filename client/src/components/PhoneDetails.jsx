import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from "axios";

function PhoneDetails({phoneId, setErrorMessage}) {
  const [phoneDetails, setPhoneDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPhoneDetails();
  }, [phoneId]);

  const getPhoneDetails = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5005/api/phones/${phoneId}`
      );
      setTimeout(() => {
        setPhoneDetails(response.data);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setErrorMessage("Ha habido un error, inténtelo más tarde") 
    }
  };

  if (isLoading) {
    return (
      <div class="spinner">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  const {
    name,
    manufacturer,
    description,
    color,
    price,
    screen,
    processor,
    ram,
    imageFileName,
  } = phoneDetails;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`/images/${imageFileName}`} />

      <Card.Body>
        <Card.Title>
        {`${name} by ${manufacturer}`}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem>Color: {color}</ListGroupItem>
        <ListGroupItem>{screen}</ListGroupItem>
        <ListGroupItem>
          Proc: {processor}. Ram: {ram}
        </ListGroupItem>
        <ListGroupItem>Starting from: {price}€</ListGroupItem>
      </ListGroup>
    </Card>
  );
}
export default PhoneDetails;
