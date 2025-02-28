import Header from '@/components/Header';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold text-primary-800 mb-8">
          Privacy Policy for FUZZ Wildcat Quiz
        </h1>
        <div className="prose prose-primary max-w-none">
          <p className="text-sm text-primary-600 mb-8">Last Updated: February 28, 2025</p>

          <h2>Introduction</h2>
          <p>Welcome to the FUZZ Wildcat Quiz. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our quiz.</p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>Email Address: When you submit your email to receive your quiz results</li>
            <li>Quiz Responses: Your answers to the personality questions</li>
            <li>Newsletter Subscription Status: Whether you opt-in to receive our newsletter</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <ul>
            <li>Device Information: Browser type, operating system, device type</li>
            <li>Usage Data: How you interact with the quiz, including time spent and completion rate</li>
            <li>IP Address: Used to approximate your location</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Deliver your personalized wildcat quiz results</li>
            <li>Send our newsletter if you opted-in</li>
            <li>Improve the quiz experience</li>
            <li>Analyze usage patterns and effectiveness</li>
            <li>Maintain the security of our service</li>
          </ul>

          <h2>Email Communications</h2>
          <p>If you opt-in to our newsletter, we will send you:</p>
          <ul>
            <li>Wildlife conservation news and stories</li>
            <li>Updates about endangered species</li>
            <li>Information about conservation organizations</li>
            <li>Opportunities to support wildlife protection efforts</li>
          </ul>
          <p>You can unsubscribe from these communications at any time by clicking the "unsubscribe" link at the bottom of any email.</p>

          <h2>Data Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your information to third parties without your consent, except as described below:</p>
          <ul>
            <li>Service Providers: We may share information with trusted third parties who help us operate our quiz and newsletter (e.g., email service providers)</li>
            <li>Legal Requirements: We may disclose information if required by law or to protect our rights</li>
          </ul>

          <h2>Data Security</h2>
          <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, so we cannot guarantee absolute security.</p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of communications</li>
          </ul>
          <p>To exercise these rights, please contact us at privacy@fuzz.net.</p>

          <h2>Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies to improve your quiz experience and analyze usage patterns. You can manage cookie preferences through your browser settings.</p>

          <h2>Children's Privacy</h2>
          <p>The FUZZ Wildcat Quiz is not intended for children under 13. We do not knowingly collect information from children under 13.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date.</p>

          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>
            Email: privacy@fuzz.net<br />
            Mail: FUZZ Media, PO Box 2908, Edwards, CO 81632
          </p>

          <p className="mt-8">By using the FUZZ Wildcat Quiz, you agree to the terms of this Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
} 