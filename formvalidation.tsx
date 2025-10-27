import React, { useState } from "react";
import validationRules from '../validationRules.json';

const FormValidation: React.FC = () => {
  const [formData, setFormData] = useState({name: "",email: "",password: ""});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string): string => {
    const rules = (validationRules as any)[field];
    if (!rules) return "";

    if (rules.required && !value.trim()) {
      return `${field} is required`;
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength}`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength}`;
    }
    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      return rules.errorMessage || `${field} is invalid`;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live validation as user types
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div style={{ display: "flex",justifyContent: "center",alignItems: "center",height: "100vh"}}>
    <div style={{ width: "350px",padding: "20px",border: "1px solid #9f2e2eff",borderRadius: "8px"}}>
      <h2 style={{ textAlign: "center" }}>Form Validation using JSON</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "95%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          {errors.name && <p style={{ color: "red", fontSize: "13px" }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "95%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          {errors.email && <p style={{ color: "red", fontSize: "13px" }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "95%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          {errors.password && <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default FormValidation;