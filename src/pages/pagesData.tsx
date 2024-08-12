import { routerType } from "../types/router.types";
import Home from "./Home/Page";

const pagesData: routerType[] = [
    {
        path: "",
        element: <Home />,
        title: "home"
    }
];

export default pagesData;
