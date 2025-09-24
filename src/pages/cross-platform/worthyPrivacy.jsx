import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../../components/aurora-text';

export default function WorthyPrivacy() {
  return (
    <main className="bg-black min-h-screen text-[#EFF9F0] px-4 py-16 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-4xl font-display font-bold text-center mb-12">
          <AuroraText>Privacy Policy for Worthy</AuroraText>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <p className="text-[#EFF9F0]/80 mb-4">
              <strong>Effective date:</strong> September 24, 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">1. Overview</h2>
            <p className="text-[#EFF9F0]/80">
              Worthy is committed to protecting your privacy. The app does <strong>not</strong> collect, store, or share any personal data from users. All data, including any financial or transaction records, resides strictly on the device and is never transmitted or accessed by us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">2. Data Collection</h2>
            <ul className="text-[#EFF9F0]/80 space-y-2 list-disc list-inside">
              <li>Worthy does <strong>not</strong> collect any personal information, usage data, device data, or analytics.</li>
              <li>We do not use tracking technologies.</li>
              <li>The app does not require account creation, login, or any form of user authentication.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">3. Third-Party Services</h2>
            <ul className="text-[#EFF9F0]/80 space-y-2 list-disc list-inside">
              <li>The app interacts with the Yahoo Finance API only to retrieve and display stock price information.</li>
              <li>No user information or device data is sent to Yahoo Finance; only stock ticker queries are transmitted.</li>
              <li>Please consult Yahoo's own privacy policy for details on how they handle API request data.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">4. Support Inquiries</h2>
            <p className="text-[#EFF9F0]/80">
              If you email us for support, your email address and any information you include in your message will only be used to respond to your request. This information is never used for marketing or shared with third parties.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">5. Changes to This Policy</h2>
            <p className="text-[#EFF9F0]/80">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page. Continued use of the app means acceptance of the updated policy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">6. Contact</h2>
            <p className="text-[#EFF9F0]/80">
              For questions or support, please email: <a href="mailto:david@camick.org" className="text-[#EFF9F0] hover:text-blue-400 transition-colors underline">david@camick.org</a>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}