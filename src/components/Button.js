import React from "react";

function Button() {
  const handleReload = () => {
    window.location.reload(); // Sayfayı yenile
  };

  return (
    <button className="button" onClick={handleReload}>
      Again?
    </button>
  );
}

export default Button;
