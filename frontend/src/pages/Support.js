import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, HelpCircle, FileText, CreditCard } from 'lucide-react';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your email service
    window.location.href = `mailto:support@dls-ai.io?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <h1 className="text-4xl font-bold text-white mb-6">Support Center</h1>
            <p className="text-gray-400 mb-8">
              Have a question or need help? We're here to assist you. Fill out the form below or use one of the quick contact methods.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="Pre-order Question">Pre-order Question</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Refund Request">Refund Request</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Account Access">Account Access</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="Please describe your question or issue in detail..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* FAQ and Quick Links */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Contact</h2>
              <div className="space-y-4">
                <a href="mailto:support@dls-ai.io" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Email Support</p>
                    <p className="text-sm">support@dls-ai.io</p>
                  </div>
                </a>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-semibold text-white">Response Time</p>
                    <p className="text-sm">Within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-white font-semibold hover:text-blue-400">
                    <span className="flex items-center space-x-2">
                      <HelpCircle className="w-5 h-5" />
                      <span>When will the platform launch?</span>
                    </span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-400 pl-7">
                    Access is planned to start within 12 months from your pre-order date. You'll receive email updates on development progress and launch timeline.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-white font-semibold hover:text-blue-400">
                    <span className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>What is your refund policy?</span>
                    </span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-400 pl-7">
                    If the platform is not launched within 24 months from your payment, we offer full refunds or alternative arrangements. See our <Link to="/terms-of-service" className="text-blue-400 hover:underline">Terms of Service</Link> for details.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-white font-semibold hover:text-blue-400">
                    <span className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Is this an investment?</span>
                    </span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-400 pl-7">
                    No. This is a pre-order contribution for future subscription access, not an investment. No equity or profit sharing is offered.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-white font-semibold hover:text-blue-400">
                    <span className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>How do I update my email?</span>
                    </span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-400 pl-7">
                    Contact our support team with your current and new email address. We'll update your account within 24 hours.
                  </p>
                </details>
              </div>
            </div>

            {/* Legal Links */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Legal & Policies</h2>
              <div className="space-y-3">
                <Link to="/terms-of-service" className="block text-blue-400 hover:text-blue-300 transition">
                  → Terms of Service
                </Link>
                <Link to="/privacy-policy" className="block text-blue-400 hover:text-blue-300 transition">
                  → Privacy Policy
                </Link>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Support Hours</h3>
              <p className="text-gray-300">
                Our support team is available Monday through Friday, 9:00 AM - 6:00 PM (UTC+0). 
                We respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
