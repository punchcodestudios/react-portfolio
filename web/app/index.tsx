import * as ReactDOM from "react-dom/client";
import AppWithProviders from "./root";

const rootEl = document.createElement("div");
document.body.append(rootEl);
ReactDOM.createRoot(rootEl).render(<AppWithProviders />);
