import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle, MapPin, MessageSquare, Phone } from "lucide-react";
import { personalInfo } from "../data";
import { ContactMessage } from "../types";

// Safe localStorage helper to prevent SecurityError exceptions in sandboxed iframes
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Storage access denied:", e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Storage write denied:", e);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Storage remove denied:", e);
    }
  }
};

interface ContactProps {
  isDarkMode: boolean;
}

export default function Contact({ isDarkMode }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sentMessages, setSentMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load sent messages on mount to show local persistence
  useEffect(() => {
    try {
      const stored = safeLocalStorage.getItem("khushi_portfolio_messages");
      if (stored) {
        setSentMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear validation errors if any
    setValidationErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simple validations
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Please provide your name.");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Please provide a valid email address.");
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.push("Please provide a message containing at least 10 characters.");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setStatus("error");
      return;
    }

    // Deliver the message directly to khushi905sharma@gmail.com using the secure FormSubmit AJAX service
    fetch("https://formsubmit.co/ajax/khushi905sharma@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `New Portfolio Message from ${formData.name}`,
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message via network service");
        }
        return response.json();
      })
      .then(() => {
        const newMessage: ContactMessage = {
          id: `msg-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const updated = [newMessage, ...sentMessages];
        setSentMessages(updated);
        try {
          safeLocalStorage.setItem("khushi_portfolio_messages", JSON.stringify(updated));
        } catch (err) {
          console.error("Error writing to localStorage", err);
        }

        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("Error during message dispatch:", err);
        setValidationErrors(["Message could not be dispatched. Please try emailing directly at khushi905sharma@gmail.com instead."]);
        setStatus("error");
      });
  };

  const handleClearMessages = () => {
    setSentMessages([]);
    safeLocalStorage.removeItem("khushi_portfolio_messages");
  };

  return (
    <section
      id="contact"
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full filter blur-[160px] bg-indigo-500/5 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full filter blur-[160px] bg-purple-500/5 animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Contact
          </motion.h2>
          <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Panel (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-800 shadow-xl shadow-slate-950/20"
                  : "bg-white border-slate-200 shadow-md shadow-slate-200/5"
              }`}
            >
              <h3
                className={`text-lg sm:text-xl font-bold font-sans mb-6 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Location</p>
                    <p className={`text-sm sm:text-base font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                {/* Phone Call */}
                <a
                  id="contact-phone-link"
                  href="tel:+919053273309"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Phone</p>
                    <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                      +91 9053273309
                    </p>
                  </div>
                </a>

                {/* Email link */}
                <a
                  id="contact-email-link"
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Email</p>
                    <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                {/* LinkedIn link */}
                <a
                  id="contact-linkedin-link"
                  href={personalInfo.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">LinkedIn</p>
                    <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline break-all">
                      linkedin.com/in/khushi-sharma-45215a399
                    </p>
                  </div>
                </a>

                {/* GitHub link */}
                <a
                  id="contact-github-link"
                  href={personalInfo.github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">GitHub</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400 group-hover:underline">
                      github.com/Khushi-ux123
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Submited Messages History Panel (Proves dynamic interactive logic) */}
            {sentMessages.length > 0 && (
              <div
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-slate-900/20 border-slate-800"
                    : "bg-indigo-50/20 border-indigo-100"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <MessageSquare size={16} />
                    Messages Sent locally ({sentMessages.length})
                  </h4>
                  <button
                    onClick={handleClearMessages}
                    className="text-[10px] font-mono hover:underline cursor-pointer text-rose-500"
                  >
                    Clear History
                  </button>
                </div>

                <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
                  {sentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-xl border text-xs font-sans ${
                        isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold">{msg.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                      </div>
                      <p className={`italic italic-lead line-clamp-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Form Panel (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              id="contact-portfolio-form"
              onSubmit={handleSubmit}
              className={`p-6 sm:p-8 rounded-2xl border space-y-5 transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-900/60 border-slate-800 shadow-xl"
                  : "bg-white border-slate-200 shadow-lg shadow-slate-200/10"
              }`}
            >
              <h3
                className={`text-lg sm:text-xl font-bold font-sans ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Send Message
              </h3>

              {/* Validation errors banner */}
              {status === "error" && validationErrors.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 space-y-1.5 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-sans flex items-start gap-2.5">
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Please correct the following errors:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {validationErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Fields */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className={`block text-xs font-bold font-mono uppercase tracking-wider mb-2 ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-colors ${
                      isDarkMode
                        ? "bg-slate-950 border-slate-800 text-white focus:border-indigo-500"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white"
                    }`}
                    disabled={status === "sending"}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className={`block text-xs font-bold font-mono uppercase tracking-wider mb-2 ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-colors ${
                      isDarkMode
                        ? "bg-slate-950 border-slate-800 text-white focus:border-indigo-500"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white"
                    }`}
                    disabled={status === "sending"}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className={`block text-xs font-bold font-mono uppercase tracking-wider mb-2 ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message details here..."
                    className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none resize-none transition-colors ${
                      isDarkMode
                        ? "bg-slate-950 border-slate-800 text-white focus:border-indigo-500"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white"
                    }`}
                    disabled={status === "sending"}
                    required
                  />
                </div>
              </div>

              {/* Submit CTA action */}
              <div className="flex items-center justify-between pt-2">
                <button
                  id="contact-form-submit"
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    status === "sending"
                      ? "bg-indigo-400 text-slate-100 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-600/30"
                  }`}
                >
                  {status === "sending" ? "Sending Details..." : "Send Message"}
                  <Send size={16} />
                </button>
              </div>

              {/* Dynamic feedback on success state */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-450 text-sm font-sans flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={18} className="flex-shrink-0" />
                    <div>
                      <p className="font-bold">Message sent successfully!</p>
                      <p className="text-xs opacity-90">Thank you for contacting me. I will get back to you shortly.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
