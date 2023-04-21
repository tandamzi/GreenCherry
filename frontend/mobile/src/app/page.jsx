import React from "react";
const page = () => {
  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("../sw.js")
        .then((registration) => {
          console.log("Service worker registered successfully:", registration);
        })
        .catch((error) => {
          console.log("Service worker registration failed:", error);
        });
    }
  };

  React.useEffect(() => {
    registerServiceWorker();
  }, []);

  return <div>page</div>;
};

export default page;
