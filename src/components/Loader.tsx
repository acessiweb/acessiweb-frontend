type LoaderProps = {
  msg?: string;
};
export default function Loader({ msg = "" }: LoaderProps) {
  return (
    <div className="loader">
      <span className="loader__animation"></span>
      <p className="loader__msg">{msg}</p>
    </div>
  );
}
