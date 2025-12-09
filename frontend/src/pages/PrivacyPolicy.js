import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-gray-400 mb-8">Last Updated: December 1, 2025</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <p className="mb-4">
                DLS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-blue-400 mb-3 mt-4">1.1 Personal Information</h3>
              <p className="mb-2">When you make a pre-order contribution, we collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Payment Information:</strong> Processed securely through Stripe (we do not store your full credit card details)</li>
                <li><strong className="text-white">Contact Information:</strong> Email address, name</li>
                <li><strong className="text-white">Billing Information:</strong> Billing address</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-3 mt-4">1.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Usage Data:</strong> IP address, browser type, pages visited</li>
                <li><strong className="text-white">Device Information:</strong> Device type, operating system</li>
                <li><strong className="text-white">Cookies:</strong> We use cookies to enhance user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-2">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your pre-order contributions and payments</li>
                <li>Provide you with subscription access upon platform launch</li>
                <li>Send you updates about DLS platform development</li>
                <li>Communicate important service-related information</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Comply with legal obligations</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Payment Processing</h2>
              <p className="mb-3">
                All payment transactions are processed through <strong className="text-blue-400">Stripe</strong>, a PCI-DSS compliant payment processor. We do not store your full credit card information on our servers.
              </p>
              <p>
                Stripe's privacy policy can be found at: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">https://stripe.com/privacy</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-3">We do not sell your personal information. We may share your information with:</p>
              
              <h3 className="text-xl font-semibold text-blue-400 mb-3 mt-4">4.1 Service Providers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Stripe:</strong> Payment processing</li>
                <li><strong className="text-white">Email Services:</strong> Transactional and marketing emails</li>
                <li><strong className="text-white">Hosting Providers:</strong> Website and data hosting</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-3 mt-4">4.2 Legal Requirements</h3>
              <p>We may disclose your information if required by law or in response to valid legal processes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="mb-3">We implement appropriate technical and organizational measures to protect your personal information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted data storage</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Secure payment processing through Stripe</li>
              </ul>
              <p className="mt-3 text-yellow-400">
                <strong>Note:</strong> No method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. This typically includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-white">Account Information:</strong> Duration of your subscription plus 7 years for tax purposes</li>
                <li><strong className="text-white">Payment Records:</strong> 7 years for financial and legal compliance</li>
                <li><strong className="text-white">Support Communications:</strong> 3 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="mb-3">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your data</li>
                <li><strong className="text-white">Portability:</strong> Receive your data in a structured format</li>
                <li><strong className="text-white">Objection:</strong> Object to processing of your data</li>
                <li><strong className="text-white">Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at <a href="mailto:privacy@dls-ai.io" className="text-blue-400 hover:text-blue-300 underline">privacy@dls-ai.io</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking</h2>
              <p className="mb-3">We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Improve website performance</li>
                <li>Provide personalized content</li>
              </ul>
              <p className="mt-3">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
              <p>
                Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="mb-4">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="bg-slate-900/50 p-6 rounded-lg space-y-2">
                <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@dls-ai.io" className="text-blue-400 hover:text-blue-300">privacy@dls-ai.io</a></p>
                <p><strong className="text-white">Support:</strong> <a href="https://dls-ai.io/support" className="text-blue-400 hover:text-blue-300">https://dls-ai.io/support</a></p>
                <p><strong className="text-white">Website:</strong> <a href="https://dls-ai.io" className="text-blue-400 hover:text-blue-300">https://dls-ai.io</a></p>
              </div>
            </section>

            <section className="pt-6 border-t border-slate-700">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm">
                  <strong className="text-blue-400">GDPR Compliance:</strong> For EU residents, we comply with the General Data Protection Regulation (GDPR). You have additional rights under GDPR, including the right to lodge a complaint with a supervisory authority.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
