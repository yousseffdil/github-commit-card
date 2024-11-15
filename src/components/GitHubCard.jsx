import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stage } from "@react-three/drei";
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const GithubCard = ({ username }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json()) // Cambié "response" por "res" y aseguré que sea procesado con .json()
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching GitHub data:", error));
  }, [username]);
  

  return (
    <Canvas style={{ height: "50vh", width: "100%", position: "relative", margin: "0 auto"}} shadows dpr={[1,2]}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      {data ? (
        
        <mesh>
          <boxGeometry args={[2, 1, 0.5]} />
          <Html position={[0, 0, 1]} transform occlude>
            <div
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 1)",
                padding: "10px",
                borderRadius: "5px",
                textAlign: "center",
                textTransform: "uppercase",
                width: "200px",
              }}
            >
                <img src={data.avatar_url} alt="Avatar" style={{ width: "100px", borderRadius: "50%" }} />
                <h3>{data.name || data.login}</h3>
                <p style={{fontSize: "0.5rem"}}>{data.bio}</p>
                <p>Repos: {data.public_repos}</p>
                <p>Followers: {data.followers}</p>
            </div>
          </Html>
        </mesh>
      ) : (
        <Html position={[0, 0, 0]} transform>
          <p>Cargando...</p>
        </Html>
      )}
      <EffectComposer>
        <Noise blendFunction={BlendFunction.MULTIPLY} />
      </EffectComposer>
    </Canvas>
  );
};

export default GithubCard;
