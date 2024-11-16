interface Props {
  src: string;
  alt: string;
}
const PageBanner = ({ src, alt }: Props) => {
  return <img src={src} alt={alt} />;
};

export default PageBanner;
