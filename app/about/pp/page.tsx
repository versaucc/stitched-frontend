'use client';

import MinimalNavbar from '../../../components/navbar/MinimalNavbar';

export default function PrivacyPolicyPage() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <MinimalNavbar />

      <div className="pt-32 px-6 lg:px-24 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-6">Effective Date: {effectiveDate}</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            At <strong>stitchedpdx.com</strong>, we respect your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we collect, use, and safeguard
            the information you provide when using our website or purchasing our products.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
          <p>
            We may collect information that you voluntarily provide to us, such as your name, email
            address, shipping address, and payment details. We may also collect non-personal information
            automatically through your interaction with our site, including browser type, pages visited,
            and other usage statistics.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Process and fulfill your orders.</li>
            <li>Enhance your online experience and website usability.</li>
            <li>Improve and develop our products and services.</li>
            <li>Communicate important updates about your orders or our services.</li>
          </ul>
          <p>
            We will never sell, rent, or share your personal information with third-party companies
            for marketing purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar technologies to track usage patterns and improve
            your experience. You can manage your browser settings to refuse cookies, but some
            features of our site may not function properly if cookies are disabled.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. While
            no method of transmission over the internet is completely secure, we strive to maintain
            appropriate safeguards to prevent unauthorized access.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
          <p>
            You have the right to access, update, or request deletion of your personal information
            by contacting us at <a href="mailto:hello@stitchedpdx.com" className="underline">hello@stitchedpdx.com</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Third-Party Services</h2>
          <p>
            We may use third-party services such as Stripe to process payments. These providers have
            their own privacy policies that govern the use of your information. We are not responsible
            for the practices of third-party services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page
            with the updated effective date. Your continued use of our website constitutes acceptance
            of any changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please
            contact us at <a href="mailto:hello@stitchedpdx.com" className="underline">hello@stitchedpdx.com</a>.
          </p>
        </section>

        <p className="mt-12 italic">Thank you for trusting Stitched PDX with your personal information.</p>
      </div>
    </div>
  );
}
