// Image
import clear from "../assets/bgImages/clear.jpg";

export default function OverlayMsg({ hideOverlay }) {
  const accessApp = () => {
    hideOverlay();
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-2 z-[1001] bg-cover bg-center"
      style={{ backgroundImage: `url(${clear})` }}
    >
      <h1 className="text-[40px] text-cyan-950 font-medium text-center mb-5">
        DISCLAIMER
      </h1>

      <p className="text-[20px] text-center max-w-[85%] mb-7">
        When submitting your first request, you will have to wait between 30 and
        60&nbsp;seconds before receiving a response. <br />
        Note that the server sleeps after 15 minutes of inactivity.
      </p>

      <button
        className="text-white text-[20px] bg-cyan-950 py-2 px-5 rounded"
        onClick={accessApp}
      >
        ACCESS WEATHER APP
      </button>
    </div>
  );
}
