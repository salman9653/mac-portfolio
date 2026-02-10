import useWindowStore from "@store/window";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <button
        id="closeBtn"
        type="button"
        className="close"
        onClick={() => closeWindow(target)}
      />
      <button id="minimizeBtn" type="button" className="minimize" />
      <button id="maximizeBtn" type="button" className="maximize" />
    </div>
  );
};

export default WindowControls;
