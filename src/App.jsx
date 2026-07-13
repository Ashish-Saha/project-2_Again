import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Taskboard from "./task/Taskboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Hero />
      <div className="flex flex-col justify-center items-center">
        <Taskboard />
      </div>

      <Footer />
    </>
  );
}

export default App;
