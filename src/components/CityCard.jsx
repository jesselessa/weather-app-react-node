export default function CityCard({ cityInfo, showRemoveButton, onRemove }) {
  const { name, main, weather, sys } = cityInfo;

  return (
    <>
      {cityInfo && (
        <div className="max-w-xs rounded overflow-hidden shadow-lg p-3 mb-5 lg:mb-0">
          <h3 className="text-center text-xl font-bold mb-2">
            {name}, {sys?.country}
          </h3>

          <img
            className="w-24 mx-auto"
            src={`http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
            alt={`${name} weather`}
          />

          <div className="px-6 py-4 text-center">
            <p>
              <span className="text-gray-700 font-bold text-base">
                Temperature&nbsp;:
              </span>{" "}
              {Math.round(main?.temp)}&nbsp;°&nbsp;C <br />
              (Min : {Math.round(main?.temp_min)}&nbsp;°&nbsp;C , Max&nbsp;:{" "}
              {Math.round(main?.temp_max)}
              &nbsp;°&nbsp;C)
            </p>
            <p>
              <span className="text-gray-700 font-bold text-base">
                Description :
              </span>{" "}
              {weather[0]?.main}
            </p>
          </div>

          <div className="flex justify-center ">
            {/*Btn remove favorite */}
            {showRemoveButton && (
              <div className="py-3 flex justify-center">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                  onClick={onRemove}
                >
                  Remove from favorites
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
