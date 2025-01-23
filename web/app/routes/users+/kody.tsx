import HeaderImage from "~/components/layout/header-image.component";
import useImage from "~/hooks/useImage";

const Kody = () => {
  const headerImage = useImage({ path: location.pathname });
  return (
    <>
      {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>}
      {/* <PageNav navItems={items}></PageNav> */}
      <div className="container mb-48 mt-36 border-4 border-green-500 bg-siteWhite">
        <h1 className="text-h1">Kody</h1>
      </div>
    </>
  );
};

export default Kody;
