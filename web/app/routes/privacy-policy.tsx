import HeaderImage from "~/components/layout/header-image.component";

const PrivacyPolicy = () => {
  return (
    <>
      <section className="flex-flex-col">
        <div className="justify-center mx-auto mb-2 p-2 bg-home-hero bg-no-repeat bg-cover bg-opacity-40 xl:flex-row xl:flex-wrap xl:justify-between xl:p-5 ">
          <div className="p-2 xl:p-0 mt-5 xl:px-5 h-[125px] xl:mt-0 text-center">
            <div className="mb-3 xl:w-120">
              <h1 className="font-header lowercase text-secondary mt-3 xl:mt-7">
                privacy policy
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-auto p-6 pb-0">
          <div className="mx-auto min-h-[50px] max-w-[90%] lg:max-w-[70%]">
            <div className="xl:flex">
              <p className="text-siteBlack text-center md:text-start">
                Punchcode Studios values your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
