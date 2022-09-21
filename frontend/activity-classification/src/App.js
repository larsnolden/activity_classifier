import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

function App() {
  const [acceleration, setAcceleration] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [magnet, setMagnet] = useState([0, 0, 0]);
  const [currentActivity, setCurrentActivity] = useState("empty");
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8765"
  );
  // const acl = useRef(null);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    /* eslint-disable */
    const acl = new Accelerometer({ frequency: 60 });
    acl.addEventListener("reading", () =>
      setAcceleration([acl.x, acl.y, acl.z])
    );

    /* eslint-disable */
    const gyroscope = new Gyroscope({ frequency: 60 });
    gyroscope.addEventListener("reading", (e) =>
      setRotation([gyroscope.x, gyroscope.y, gyroscope.z])
    );

    /* eslint-disable */
    const magSensor = new Magnetometer({ frequency: 60 });
    magSensor.addEventListener("reading", (e) =>
      setMagnet([magSensor.x, magSensor.y, magSensor.z])
    );

    acl.start;
    gyroscope.start();
    magSensor.start();
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="App">
      <header className="App-header">
        <h1>{lastMessage ? JSON.stringify(lastMessage.data) : null}</h1>
        <span>The WebSocket is currently {connectionStatus}</span>
        {acceleration[1]}
        {rotation[1]}
      </header>
    </div>
  );
}

export default App;
