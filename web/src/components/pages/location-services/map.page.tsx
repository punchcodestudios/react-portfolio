import TaskListMenuBar from "@/components/common/data-grid/data-grid-menu-bar.component";
import LocationMap from "@/components/maps/map.component";

const pageHeaderImage = require("../../../assets/img/location-services.png");
const MapPage = () => {
  return (
    <>
      <article className="resume">
        <section className="header">
          <img src={pageHeaderImage}></img>
        </section>
        <TaskListMenuBar></TaskListMenuBar>
        <div style={{ width: "400px", height: "400px" }}>
          <LocationMap />
        </div>
      </article>
    </>
  );
};

export default MapPage;
