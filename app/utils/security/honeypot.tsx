import { useState } from "react";

/**
 * Honeypot Field Generator
 * 
 * Creates a hidden field that legitimate users won't interact with,
 * but spam bots will likely fill in.
 */

export function generateHoneypotField() {
  const timestamp = Date.now();
  const fieldName = `field_${btoa(String(timestamp)).slice(0, 8)}`;
  
  return {
    fieldName,
    timestamp,
  };
}

export function useHoneypot() {
  const [honeypot] = useState(generateHoneypotField);

  return {
    fieldName: honeypot.fieldName,
    component: (
      <input
        type="text"
        name={honeypot.fieldName}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
        }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
    ),
  };
}

export function validateHoneypot(formData: FormData, fieldName: string): boolean {
  const honeypotValue = formData.get(fieldName);
  return honeypotValue === "" || honeypotValue === null;
}