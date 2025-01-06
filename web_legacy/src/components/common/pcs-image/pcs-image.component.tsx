import "../../common/pcs-image/pcsimage.css";

interface Props {
  image: any;
  alt: string;
  cssClass?: string;
}

const PCSImage = ({ image, alt, cssClass }: Props) => {
  return <img src={image} alt={alt} className={cssClass}></img>;
};

export default PCSImage;
