import { useState } from "react";

function Record() {

  const [error, setError] = useState(null);
  const [ingreso, setIngreso] = useState(null);
  const [egreso, setEgreso] = useState(null);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "- - -";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
    return dateTime.toLocaleString("en-US", options);
  };



  return (
    <>
      <div>
        <header className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Record
            </h1>
          </div>
        </header>
        <div className="flex flex-col items-center p-5">
          <div className="w-full flex justify-around mt-10">
            <div className="text-center">
              <p className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">
                Time & Date Income
              </p>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {formatDateTime(ingreso)}
              </p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">
                Time & Date Egress
              </p>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {formatDateTime(egreso)}
              </p>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Record;
