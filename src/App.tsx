import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";

function App() {

  return (

    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-slate-800">

      <BrowserRouter>

        <Router />

      </BrowserRouter>

    </div >

  );
}

export default App;
