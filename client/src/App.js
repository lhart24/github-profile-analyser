import { useState } from "react";
import axios from "axios";

export default function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/api/github/analyser/${username}`);
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };


  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>GitHub User Analyser</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />

      <button onClick={fetchData}>Analyse</button>

      {loading && <p>Loading...</p>}
      

      {data && (
        <div>
          <h2>Results</h2>
          <p>Score: {data.score?.totalScore}</p>
          <p>Grade: {data.score?.Grade}</p>
          <p>Favourite Language: {data.favouriteLanguage?.favouriteLanguage}</p>
          <p>Total Repos: {data.result.repository_count}</p>
          <p>Total Stars: {data.result.total_stars}</p>
        </div>
      )}
    </div>
  );
} 