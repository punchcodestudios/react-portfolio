const gradImage = require("../../../assets/img/graduation-logo.png");
function ResumeEducationComponent() {
  return (
    <section
      className="row justify-content-start align-items-center"
      style={{ backgroundColor: "white" }}
    >
      <div className="p-3 col-md-2">
        <img src={gradImage} className="graduation-icon" />
      </div>
      <div className="p-3 col-md-10">
        <h3>
          <strong>DeVry University - 2009</strong>
        </h3>
        <div>1310 E. 104th Street, Kansas City, MO 64131</div>
        <div>Bachelor's of Science</div>
        <div>
          <i>Suma Cum Laude</i>
        </div>
      </div>
    </section>
  );
}
export default ResumeEducationComponent;
