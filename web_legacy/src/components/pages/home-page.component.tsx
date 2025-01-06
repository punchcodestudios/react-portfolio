function HomePageComponent() {
  const heroImage = require("../../assets/img/home_hero.png");
  return (
    <>
      <div className="row gx-4 gx-lg-5 align-items-center my-5">
        <div className="col-lg-7">
          <img
            className="img-fluid rounded mb-4 mb-lg-0"
            src={heroImage}
            alt="homepage hero for react development portfolio"
          />
        </div>
        <div className="col-lg-5">
          <h1 className="brand-font">punchcode studio</h1>
          <h2 className="font-weight-light">react development</h2>
          <p>
            Explore this site to learn the many ways punchcodestudios leverages
            the power and flexibility of react.js and many associated libraries
            to develop robust solutions that will meet your business needs
          </p>
        </div>
      </div>

      <div className="card text-white bg-primary my-5 py-4 text-center">
        <div className="card-body">
          <p className="text-white m-0"></p>
          <p className="text-white m-0">
            <a
              className="text-white no-underline"
              target="_blank"
              href="https://avilpage.com/2014/12/14-great-quotes-about-python.html"
            >
              &quot;Everyone knows that any scripting language shootout that
              doesnt show python as the best language is faulty by design&quot;
              ~ Max M
            </a>
          </p>
        </div>
      </div>

      <div className="row gx-4 gx-lg-5">
        <div className="col-md-4 mb-5">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Projects</h2>
              <p className="card-text">
                Join us as we take a deep dive into the many projects punchcode
                studios has developed using the power of react.js
              </p>
            </div>
            <div className="card-footer">
              <a
                className="btn btn-secondary btn-sm"
                href="{{ url_for('projects') }}"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">About this site</h2>
              <p className="card-text">
                Examine the technical details of this site to learn how the
                power of react.js can benefit your business
              </p>
            </div>
            <div className="card-footer">
              <a
                className="btn btn-secondary btn-sm"
                href="{{ url_for('about') }}"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Contact</h2>
              <p className="card-text">
                Send us a message - punchcodestudios is excited to hear from
                you!
              </p>
            </div>
            <div className="card-footer">
              <a
                className="btn btn-secondary btn-sm"
                href="{{ url_for('contact') }}"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
    // <article className="home">
    //   <section className="header">
    //     <h1>Welcome to punchcodestudio.com</h1>
    //   </section>
    // </article>
  );
}
export default HomePageComponent;
