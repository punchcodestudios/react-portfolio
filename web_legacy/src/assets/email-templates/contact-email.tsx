import ReactDOMServer from "react-dom/server";

const ContactEmail = () => {
  return (
    <div>This should get rendered as an html string and sent as an email</div>
  );
};

const html = ReactDOMServer.renderToString(<ContactEmail />);
export default html;
