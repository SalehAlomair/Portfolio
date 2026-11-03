import { TwinIcon } from "./Chat";

export default function TwinLauncher({ open, onOpen }) {
  return (
    <button
      className="twin-launcher"
      onClick={(event) => {
        event.currentTarget.focus();
        onOpen();
      }}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      <TwinIcon />
      <span>Ask Saleh’s AI</span>
    </button>
  );
}
