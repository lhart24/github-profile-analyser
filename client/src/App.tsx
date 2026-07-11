import { useState } from "react";
import axios from "axios";

interface GithubData {
  result: {
    repository_count: number;
    total_stars: number;
  };
  score?: {
    totalScore: number;
    Grade: string;
  };
  favouriteLanguage?: {
    favouriteLanguage: string;
  };
}

export default function App() {
  const [username, setUsername] = useState<string>("");
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    if (!username.trim()) return;

    setLoading(true);

    try {
      const res = await axios.get<GithubData>(
        `http://localhost:5001/api/github/analyser/${username}`
      );

      setData(res.data);
    } catch (err: unknown) {
      console.error(err);
      alert("Failed to fetch GitHub profile.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 650,
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>GitHub Profile Analyser</h1>

        <p style={{ color: "#666" }}>
          Analyse any public GitHub profile.
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
            marginBottom: 25,
          }}
        >
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Enter GitHub username..."
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />

          <button
            onClick={fetchData}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: 8,
              background: "#24292f",
              color: "white",
              cursor: "pointer",
            }}
          >
            Analyse
          </button>
        </div>

        {loading && <p>Loading profile...</p>}

        {data && (
          <>
            <h2>Results</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 15,
                marginTop: 20,
              }}
            >
              <Stat
                title="Score"
                value={data.score?.totalScore}
              />

              <Stat
                title="Grade"
                value={data.score?.Grade}
              />

              <Stat
                title="Favourite Language"
                value={data.favouriteLanguage?.favouriteLanguage}
              />

              <Stat
                title="Repositories"
                value={data.result.repository_count}
              />

              <Stat
                title="Stars"
                value={data.result.total_stars}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string | number | undefined;
}) {
  return (
    <div
      style={{
        background: "#fafafa",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#777",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {value ?? "-"}
      </div>
    </div>
  );
}