import React from "react";

const PayPalButton: React.FC = () => {
  const handlePay = () => {
    window.open("https://www.paypal.com/ncp/payment/WPSLPY9WJ5TMJ", "_blank");
  };

  return (
    <button 
      onClick={handlePay} 
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
    >
      Pagar con PayPal
    </button>
  );
};

export default PayPalButton;


