import React, { useState, useRef } from "react";
import "./PhoneVerification.css";

function PhoneVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.keyCode === 8 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    } else if (event.keyCode === 37 && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.keyCode === 39 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const pastedOtp = pastedData.match(/\d/g);
    if (pastedOtp && pastedOtp.length === 6) {
      setOtp(pastedOtp);
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    alert(`Entered OTP: ${enteredOtp}`);
  };

  return (
    <div className="phone-verification">
      <button onClick={() => inputRefs.current[0].focus()}>
        Verify Phone Number
      </button>
      <div className="otp-input-container">
        {otp.map((val, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={val}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PhoneVerification;
