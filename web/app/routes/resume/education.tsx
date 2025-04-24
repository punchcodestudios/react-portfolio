import gradImage from "/static/img/graduation-logo.png";
const Education = () => {
  return (
    <section
      className="flex flex-row justify-content-start align-items-center"
      style={{ backgroundColor: "white" }}
    >
      <div className="p-3 w-[20%]">
        <img src={gradImage} className="graduation-icon" />
      </div>
      <div className="flex flex-col p-3 w-[80%] items-start justify-center">
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
};

export default Education;
