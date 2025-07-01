type ErrorsProps = {
  msgs: string[];
  isAlert: boolean;
};

export default function Errors({ msgs, isAlert }: ErrorsProps) {
  return (
    <div className="error-msgs-container" role={isAlert ? "alert" : "status"}>
      {msgs.map((msg, i) => (
        <p key={i} className="error-msgs-container__error-msg">
          {"❌" + msg}
        </p>
      ))}
    </div>
  );
}
