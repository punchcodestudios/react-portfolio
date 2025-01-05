import TermsOfUseContent from "./terms-of-use.content";

const pageHeaderImage = require("../../../assets/img/error.png");
const PrivacyPolicyPage = () => {
  return (
    <>
      <article className="resume">
        <section className="header">
          <img src={pageHeaderImage}></img>
        </section>
        <TermsOfUseContent></TermsOfUseContent>
      </article>
    </>
  );
};

export default PrivacyPolicyPage;
