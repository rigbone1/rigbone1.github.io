import "./Terminal.css";

export function Terminal() {
  return (
    <>
      <ul className="lines">
        <li className="line">
          <div className="prompt"></div>

          <textarea className="input" id="input" rows={1}></textarea>
        </li>
      </ul>
    </>
  );
}
