import PCSImage from "@/components/common/pcs-image/pcs-image.component";
const image = require("../../../assets/img/self_portrait.png");

function ResumeIndexContentComponent() {
  return (
    <section className="d-flex flex-direction-row">
      <div className="row">
        <div className="p-3 col-lg-3 ms-auto me-auto">
          <PCSImage
            image={image}
            alt="some alt text for screen readers and what not"
            cssClass={`round md mx-auto my-auto d-block`}
          ></PCSImage>
        </div>
        <div className="p-3 pr-4 col-lg-8 d-block my-auto">
          <p className="">
            I am a results-oriented team player with the ability to translate
            abstract problems into modern, tangible solutions. In every aspect
            of my life, I am driven by the pursuit of knowledge and will
            persevere through challenges utilizing my strong analytical and
            problem-solving skills. I thrive in an environment of open
            communication which values respect towards acquired knowledge and
            experience while evaluating alternative viewpoints with honesty and
            rationale. I actively work towards promoting a culture of work/life
            balance by utilizing my organization and time management skills.
          </p>
        </div>
      </div>
    </section>
  );
}
export default ResumeIndexContentComponent;
