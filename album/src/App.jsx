import { useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
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
          MusicGenre: optionState.value,
          TrackCount: event.currentTarget.elements.formTrack.value,
          YearPublished: event.currentTarget.elements.formYear.value,
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
      <div>
        <br />
        {!showAlbums ? (
          <Button variant="primary" onClick={fetchAlbums}>
            Get Albums
          </Button>
        ) : (
          <Button variant="danger" onClick={() => setShowAlbums(false)}>
            Hide Albums
          </Button>
        )}

        <br />
        <br />
        {showAlbums ? (
          <Table>
            <thead>
              <tr>
                <th>Band</th>
                <th>AlbumName</th>
                <th>Genre</th>
                <th>Tracks</th>
                <th>YearPublished</th>
                <th></th>
              </tr>
            </thead>
            {albumData.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td>{item.band}</td>
                  <td>{item.albumName}</td>
                  <td>{Genre[item.musicGenre]}</td>
                  <td>{item.trackCount}</td>
                  <td>{item.yearPublished}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteAlbum(item.id)}
                    >
                      Remove
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
          <Button variant="primary" onClick={() => setShowAddAlbum(true)}>
            Add Album
          </Button>
        ) : (
          ""
        )}
        {showAddAlbum ? (
          <Form onSubmit={handleAddAlbum}>
            <Form.Group className="mb-3" controlId="formBand">
              <Form.Label>
                <b>Band</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Band Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAlbum">
              <Form.Label>
                <b>Album</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Album Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGenre">
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
            <Form.Group className="mb-3" controlId="formTrack">
              <Form.Label>
                <b>Track Count</b>
              </Form.Label>
              <Form.Control type="number" placeholder="Tracks Count" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formYear">
              <Form.Label>
                <b>Published</b>
              </Form.Label>
              <Form.Control type="number" placeholder="Year Published" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
