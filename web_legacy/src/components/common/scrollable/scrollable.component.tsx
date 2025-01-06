interface Props {
  children: React.ReactNode;
  id: string;
  timeout: number;
}
const HandleScroll = (e: React.MouseEvent<HTMLDivElement>, timeout: number) => {
  setTimeout(
    (curr) => {
      document.getElementById(curr.id)?.scrollIntoView({ behavior: "smooth" });
    },
    timeout,
    e.currentTarget
  );
};

const Scrollable = ({ children, id, timeout }: Props) => {
  return (
    <div
      id={id}
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        HandleScroll(e, timeout)
      }
    >
      {children}
    </div>
  );
};

export default Scrollable;
