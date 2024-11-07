// Image
import clear from "../assets/bgImages/clear.jpg";

export default function OverlayMsg({ hideOverlay }) {
  const accessApp = () => {
    hideOverlay();
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-2 z-[1001]"
      style={{ backgroundImage: `url(${clear})` }}
    >
      <h1 className="text-[30px] text-[#008080] font-medium text-center mb-5">
        DISCLAIMER
      </h1>

      <p className="text-[20px] text-center max-w-[80%] mb-5">
        When submitting your first request, you will have to wait about
        50&nbsp;seconds before receiving a response. Note that the server sleeps
        after 15 minutes of inactivity.
      </p>

      <button
        className="text-white text-[20px] py-1 px-3 rounded"
        style={{ backgroundColor: " #008080" }}
        onClick={accessApp}
      >
        ACCESS WEATHER APP
      </button>
    </div>
  );
}
