import { routerType } from "../types/router.types";
import Chart from "./Chart/page";
import Home from "./Home/page";
import NotFound from "./notFound";

const pagesData: routerType[] = [
    {
        path: "",
        element: <Home />,
        title: "home"
    },
    {
        path: "/charts/:walletId",
        element: <Chart />,
        title: "chart"
    },
    {
        path: "*",
        element: <NotFound />,
        title: '404'
    }
];

export default pagesData;
