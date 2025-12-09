import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last Updated: December 1, 2025</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using DLS (Digital Labeling System) website and services ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="mb-3">
                DLS provides an early-supporter pre-order program for future subscription access to our Digital Labeling System platform. The Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pre-order contributions for Consumer, Maker, and Store plans</li>
                <li>Future subscription access upon platform launch</li>
                <li>Information about our retail technology platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Early-Support Model</h2>
              <p className="mb-3">
                <strong className="text-white">Important Clarification:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your payment is treated as a <strong className="text-blue-400">pre-order / early-support contribution</strong> linked to a future subscription</li>
                <li>This is <strong className="text-white">NOT an investment</strong> and NOT an offer to sell securities</li>
                <li>No equity, profit sharing, or guaranteed financial return is offered</li>
                <li>Your contribution locks in a discounted 2-year subscription upon platform launch</li>
                <li>Access is planned to start within 12 months, with 2 full years of use from official launch date</li>
                <li>If launch is delayed, your 2-year access shifts accordingly - you always get the full duration</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment and Pricing</h2>
              <p className="mb-3">All payments are processed securely through Stripe. By making a payment, you agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in USD</li>
                <li>Payments are non-refundable except as described in Section 6</li>
                <li>You are responsible for any payment processing fees</li>
                <li>Prices may change for new customers, but your locked-in rate is guaranteed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. User Obligations</h2>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete payment information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the Service only for lawful purposes</li>
                <li>Not attempt to reverse engineer or compromise our systems</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Refund Policy</h2>
              <p className="mb-3">
                If the DLS platform is not launched within a reasonable timeframe (defined as 24 months from your payment date), we will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Communicate options to all early supporters</li>
                <li>Offer refunds or alternative arrangements</li>
                <li>Process refunds within 30 business days of request</li>
              </ul>
              <p className="mt-3">
                For other refund requests, please contact our support team. Refunds are evaluated on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are owned by DLS and protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p className="mb-3">
                To the maximum extent permitted by law, DLS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
                <li>Any bugs, viruses, or the like that may be transmitted through the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which DLS operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
              <p className="mb-2">For questions about these Terms, please contact us:</p>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <p><strong className="text-white">Email:</strong> support@dls-ai.io</p>
                <p><strong className="text-white">Website:</strong> https://dls-ai.io/support</p>
              </div>
            </section>

            <section className="pt-6 border-t border-slate-700">
              <p className="text-sm text-gray-400">
                By clicking "Pre-order" or making a payment, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
