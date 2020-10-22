import { configure } from "mobx";
import { Link, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import FormExample from "./pages/FormExample";
import { Container } from "semantic-ui-react";
configure({ enforceActions: "never" });

function App() {
  return (
    <Container>
      <div style={{ background: "lightgray" }}>
        <Link to="/">Go to Home</Link>
        <Link to="/formTest">Go to Form Test</Link>
      </div>
      <Route path="/" exact component={Home} />
      <Route path="/formTest" component={FormExample} />
    </Container>
  );
}

export default App;
