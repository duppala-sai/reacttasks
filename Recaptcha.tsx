import  { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha: React.FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState( {username: "", password: ""} );

  const handleCaptchaChange = (value: string | null) => {
    console.log("Captcha token:", value);
    setCaptchaValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the CAPTCHA first!");
      return;
    }

    console.log("Login data:", formData);
    alert("Login successful");
  };

  return (
    <div className="login-page" style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Login Page with Google reCAPTCHA</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />

        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
            onChange={handleCaptchaChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Captcha;
