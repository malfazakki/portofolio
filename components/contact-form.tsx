"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError("");

      try {
        // Create mailto link
        const mailtoLink = `mailto:malfazakki@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(formData.name)}%0AEmail:%20${encodeURIComponent(formData.email)}%0AMessage:%20${encodeURIComponent(formData.message)}`;
        
        // Open mail client
        window.location.href = mailtoLink;

        // Reset form
        setFormData({ name: "", email: "", message: "" });
        setSubmitSuccess(true);

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        setSubmitError("Failed to open mail client. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 retro-container">
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-medium leading-none text-primary">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="retro-input w-full text-xs"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-medium leading-none text-primary">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="retro-input w-full text-xs"
          placeholder="your.email@example.com"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-medium leading-none text-primary">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="retro-input w-full text-xs"
          placeholder="Your message..."
        />
      </div>
      <button type="submit" disabled={isSubmitting} className="retro-button text-xs w-full">
        {isSubmitting ? (
          <>Loading...</>
        ) : (
          <>
            Send Message <Send className="ml-2 h-3 w-3 inline" />
          </>
        )}
      </button>

      {submitSuccess && (
        <div className="p-3 border-2 border-primary bg-background text-primary text-xs">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {submitError && (
        <div className="p-3 border-2 border-destructive bg-background text-destructive text-xs">{submitError}</div>
      )}
    </form>
  )
}
