import { Button } from "~/components/ui/button";
import { PortfolioImage } from "../../components/layout/header-image";
import useImage from "~/hooks/useImage";
import { Link } from "react-router";

const SummaryContent = () => {
  const image = useImage({ path: "/self" });

  return (
    <section className="flex flex-row justify-center my-5">
      <div className="xl:grid xl:grid-cols:4 justify-center items-center lg:w-[90%] xl:grid-cols-4">
        <div className="mx-auto bg-gray-50 p-2 w-full flex xl:max-h-[400px] xl:max-w-[800px]">
          {/* <PortfolioImage headerImage={image}></PortfolioImage> */}
          <div className="w-full p-10">
            <h2 className="font-header">Patrick Schandler</h2>
            <p className="font-text text-sm mb-5">
              Kansas City, MO | Chicago, IL
            </p>
            {/* </div>
          <div> */}
            <Link to="/contact">
              <Button variant="secondary" className="mb-3">
                Contact Me
              </Button>
            </Link>
            <Button variant="secondary" className="mb-3">
              resume.docx
            </Button>
            <Button variant="secondary" className="mb-3">
              resume.pdf
            </Button>
          </div>
        </div>
        <div className="p-5 lg:col-span-2 xl:col-span-3 lg:p-5 md:lg-24">
          <p className="">
            I am a Software Engineer with over 15 years of experience in Windows
            and Web development, specializing in Microsoft .NET technologies.
            Over the span of my career, I have lived my passion for continuous
            learning and self-improvement by constantly evolving my skillset to
            meet the demands of a rapidly changing technical landscape. I began
            my career as a Windows application developer using Microsoft's
            VB.NET and later transitioned to web applications using Microsoft's
            C#.NET. After spending quite a few years in my role as a backend
            developer focusing on performance and architecture, I began to
            expand my expertise into the front end while turning to the many
            different JavaScript libraries and other browser-based technologies.
            In my spare time, I enjoy keeping physically active with an exercise
            routine and various home improvement projects. I remain mentally
            active with side projects that fulfill my lifelong passion for fine
            arts by exploring tools such as Blender and THREE.js along with the
            Adobe Creative Suite of products. As a senior-level developer, I am
            equally comfortable working independently as I am collaborating with
            a larger team. I am excited to demonstrate my proven track record of
            delivering effective, comprehensive, client-centered software
            solutions that address essential, real-world objectives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default function Summary() {
  return <SummaryContent></SummaryContent>;
}

/*Collaborating with the team at Nourish, I intend to leverage my creativity and technical expertise to advocate for what I consider to be a vital element of a happy and successful life. Personally, I am a passionate advocate for proper nutrition, and I would take pride in joining a team equipped with the resources and capability to provide positive guidance to a broad audience in this field. */
