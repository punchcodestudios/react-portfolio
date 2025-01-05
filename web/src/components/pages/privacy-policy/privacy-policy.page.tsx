import PrivacyPolicyContent from "./privacy-policy.content";

const pageHeaderImage = require("../../../assets/img/error.png");
const PrivacyPolicyPage = () => {
  return (
    <>
      <article className="resume">
        <section className="header">
          <img src={pageHeaderImage}></img>
        </section>
        <section className="">
          <PrivacyPolicyContent></PrivacyPolicyContent>
        </section>
      </article>
    </>
  );
};

export default PrivacyPolicyPage;
