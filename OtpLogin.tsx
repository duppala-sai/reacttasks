import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

const Otp: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [error, setError] = useState("");

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth, 
        "recaptcha-container", 
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
        }
      );
    }
    return (window as any).recaptchaVerifier;
  };

  const sendOtp = async () => {
    setError("");
    if (!name || !phone) return setError("Enter name and phone number");

    try {
      const appVerifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      alert(`OTP sent to ${phone}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (!otp) return setError("Enter OTP");

    try {
      await confirmationResult.confirm(otp);
      alert(`Welcome, ${name}! Login successful.`);
      setName("");
      setPhone("");
      setOtp("");
      setConfirmationResult(null);
    } catch (err) {
      console.error(err);
      setError("Invalid OTP");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Login with OTP</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!confirmationResult ? (
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "100%",
              marginBottom: "0.5rem",
            }}
          />
          <input
            type="tel"
            placeholder="+91..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "100%",
              marginBottom: "0.5rem",
            }}
          />
          <button
            onClick={sendOtp}
            style={{marginLeft:"100px",width: "50%", padding: "0.5rem" }}
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "100%",
              marginBottom: "0.5rem",
            }}
          />
          <button
            onClick={verifyOtp}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            Verify OTP
          </button>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Otp;
