import { useState } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./App.css";

function App() {
  const [albumData, setAlbumData] = useState([]);
  const [showAlbums, setShowAlbums] = useState(false);
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [optionState, setOptionState] = useState(0);

  const Genre = ["Rock", "Pop", "Techno", "Synth"];

  const fetchAlbums = async () => {
    try {
      const response = await axios
        .get("https://localhost:7057/albums")
        .then((res) => {
          setAlbumData(res.data);
          console.log("Got albums");
          setShowAlbums(true);
        });
    } catch (error) {
      console.log("Something wrong: " + error);
    }
  };

  function deleteAlbum(id) {
    try {
      const response = axios
        .delete(`https://localhost:7057/albums/${id}`)
        .then(() => {
          fetchAlbums();
          console.log("Album with id: " + id + " deleted");
        });
    } catch (error) {
      console.log("Error deleting album: " + error);
    }
  }

  function handleAddAlbum(event) {
    event.preventDefault();
    try {
      axios
        .post("https://localhost:7057/albums", {
          Band: event.currentTarget.elements.formBand.value,
          AlbumName: event.currentTarget.elements.formAlbum.value,
          TrackCount: event.currentTarget.elements.formTrack.value,
          YearPublished: event.currentTarget.elements.formYear.value,
          MusicGenre: parseInt(optionState),
        })
        .then(() => {
          console.log("Album added");
          fetchAlbums();
          setShowAddAlbum(false);
        });
    } catch (error) {
      console.log("Error adding album: " + error);
    }
  }

  return (
    <>
      <div className="background">
        <div style={{ margin: "50px" }}>
          <h1>Album Nonsense</h1>
          <br />
          {!showAlbums ? (
            <Button variant="success" onClick={fetchAlbums}>
              <p className="textButton">Get Albums</p>
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setShowAlbums(false)}>
              <p className="textButton">Hide Albums</p>
            </Button>
          )}

          <br />
          <br />
          {showAlbums ? (
            <Table variant="dark" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="text">Band</th>
                  <th className="text">AlbumName</th>
                  <th className="text">Genre</th>
                  <th className="text">Tracks</th>
                  <th className="text">YearPublished</th>
                  <th></th>
                </tr>
              </thead>
              {albumData.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td className="text">{item.band}</td>
                    <td className="text">{item.albumName}</td>
                    <td className="text">{Genre[item.musicGenre]}</td>
                    <td className="text">{item.trackCount}</td>
                    <td className="text">{item.yearPublished}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteAlbum(item.id)}
                      >
                        <p className="textButton">Remove</p>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ) : (
            ""
          )}

          <br />
          {!showAddAlbum ? (
            <Button variant="success" onClick={() => setShowAddAlbum(true)}>
              <p className="textButton">Add Album</p>
            </Button>
          ) : (
            ""
          )}
          {showAddAlbum ? (
            <Form onSubmit={handleAddAlbum}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBand">
                    <Form.Label>
                      <b>Band</b>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Band Name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formAlbum">
                    <Form.Label>
                      <b>Album</b>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Album Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formTrack">
                    <Form.Label>
                      <b>Track Count</b>
                    </Form.Label>
                    <Form.Control type="number" placeholder="Tracks Count" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formYear">
                    <Form.Label>
                      <b>Published</b>
                    </Form.Label>
                    <Form.Control type="number" placeholder="Year Published" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                className="mb-3"
                controlId="formGenre"
                style={{ width: "20%" }}
              >
                <Form.Label>
                  <b>Genre</b>
                </Form.Label>
                <Form.Control
                  as="select"
                  type="number"
                  value={optionState}
                  onChange={(e) => setOptionState(e.target.value)}
                >
                  <option value={0}>Rock</option>
                  <option value={1}>Pop</option>
                  <option value={2}>Techno</option>
                  <option value={3}>Synth</option>
                </Form.Control>
              </Form.Group>
              <Button variant="success" type="submit">
                <p className="textButton">Save</p>
              </Button>
            </Form>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
