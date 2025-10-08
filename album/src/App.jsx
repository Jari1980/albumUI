import { useState } from 'react'
import { Button, Table } from "react-bootstrap";
import axios from "axios"
import './App.css'

function App() {
  const [albumData, setAlbumData] = useState([])

  const Genre = ["Rock", "Pop", "Techno", "Synth"]

  const fetchAlbums = async() => {
    try {
      const response = await axios
        .get("https://localhost:7057/albums")
        .then((res) => {
          setAlbumData(res.data);
          console.log("Got albums")
        });
    } catch (error) {
      console.log("Something wrong: " + error);
    }
  }

  return (
    <>
      <div>
        <Button variant="primary" onClick={fetchAlbums}>Get Albums</Button>
        <br/>
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
                <td><Button variant="danger">Remove</Button></td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </>
  )
}

export default App
