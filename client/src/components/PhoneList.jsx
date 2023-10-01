import ListGroup from "react-bootstrap/ListGroup";

function PhoneList({allPhones, phoneId, setPhoneId}) {
  return (
    <ListGroup>
      {allPhones.map(({ id, name }) => {
        return (
          <ListGroup.Item
            key={id}
            onClick={() => setPhoneId(id)}
            variant={phoneId === id ? "success" : "light"}
          >
            {name}
          </ListGroup.Item>
        );
      })}
  </ListGroup>
  )
}

export default PhoneList