import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState({});
  const [title, setTitle] = useState('')

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    const filteredData = data.filter(val => val.title.includes(title));
    setFilteredData(filteredData)
  }, [data, title])

  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
      setFilteredData(res);
    });
  }, []);

  const onClickView = (value) => {
    setSelected(value);
  };

  const onClose = () => {
    setSelected({});
  }

  return (
    <>
      {selected?.id && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "30%",
            width: "50%",
            height: "50%",
            zIndex: "10",
            background: "grey",
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ fontWeight: "700" }}>Id: {selected?.id}</div>
          <div style={{ fontWeight: "700" }}>UserId: {selected?.id}</div>
          <div>Title: {selected?.title}</div>
          <div>Body: {selected?.body}</div>

          <button onClick={onClose} style={{marginTop: '20px'}}>Close</button>
        </div>
      )}

      <div style={{marginBottom: '24px'}}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {filteredData &&
          filteredData.length > 0 &&
          filteredData.map(({ id, title, userId, body }) => (
            <div
              key={id}
              style={{
                width: "300px",
                border: "1px solid black",
                cursor: "pointer",
              }}
              onClick={() => onClickView({ id, title, userId, body })}
            >
              <div style={{ fontWeight: "700" }}>{id}</div>
              <div>{title}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
