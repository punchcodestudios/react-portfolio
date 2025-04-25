import ReactDOM from "react-dom/client";
import AppWithProviders from "./root";

const element = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(element!);

root.render(<AppWithProviders></AppWithProviders>);
