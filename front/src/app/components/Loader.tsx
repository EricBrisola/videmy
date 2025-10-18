import Lottie from "lottie-react";

type animationProps = {
  animation: object;
};

const Loader = ({ animation }: animationProps) => {
  return (
    <article className="h-15 w-15">
      <Lottie animationData={animation} />
    </article>
  );
};
export default Loader;
