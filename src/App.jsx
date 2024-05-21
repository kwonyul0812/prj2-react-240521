import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./page/Home.jsx";
import {BoardWrite} from "./page/board/BoardWrite.jsx";
import {BoardList} from "./page/board/BoardList.jsx";

function App(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children: [
        {
          index: true,
          element: <BoardList/>
        }, {path: "write", element: <BoardWrite/>}],
    },
  ]);

  return (
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}

export default App;
