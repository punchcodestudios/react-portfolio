import React from "react";
import { PortfolioImage } from "../layout/header-image";
import useImage from "~/hooks/useImage";

const SummaryContent = () => {
  const image = useImage({ path: "/self" });

  return (
    <section className="flex flex-row justify-center my-5">
      <div className="grid grid-cols:1 justify-center items-center md:w-[80%] lg:grid-cols-3 lg:w-[90%] xl:grid-cols-4">
        <div className="mx-auto p-2 flex max-h-[200px] max-w-[200px] md:max-h-[250px] md:max-w-[250px] lg:max-h-[300px] lg:max-w-[300px] xl:max-h-[400px] xl:max-w-[400px]">
          <PortfolioImage headerImage={image}></PortfolioImage>
        </div>
        <div className="p-5 lg:col-span-2 xl:col-span-3 lg:p-5 md:lg-24">
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
};

export default SummaryContent;
