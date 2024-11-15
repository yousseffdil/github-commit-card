import React from "react";
import GithubCard from "./components/GitHubCard";
function App() {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <GithubCard username="yousseffdil" />
    </div>
  );
}

export default App;
