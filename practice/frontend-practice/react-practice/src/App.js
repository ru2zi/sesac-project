import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
//import Button from "@mui/material/Button";

const Button = function (props) {
  return <button onClick={props.onTalk}>Click me! </button>;
};

function Talker() {
  function handleTalk() {
    let speech = "";

    for (let i = 0; i < 10_000; i++) speech += "blah";
    alert(speech);
  }
  return (
    <div>
      <Button variant="contained" onTalk={handleTalk}></Button>
    </div>
  );
}

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            console.log(event);
            event.preventDefault();
            props.onChangeMode(event.target.id);
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Count() {
  let [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }
  return <button onClick={handleClick}>눌러라{count}</button>;
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];

  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => alert("Heard")}></Header>

      <Nav topics={topics} onChangeMode={(id) => alert(id)}></Nav>

      <Article title="Welcome" body="Hello, Web"></Article>

      <Talker />
      <Count />
    </div>
  );
}

export default App;
