'use client';

import MinimalNavbar from '../../../components/navbar/MinimalNavbar';

export default function TermsOfServicePage() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <MinimalNavbar />

      <div className="pt-32 px-6 lg:px-24 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-6">Effective Date: {effectiveDate}</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to <strong>stitchedpdx.com</strong> operated by Stitched PDX LLC, located at
            38029 SW Blooming Fern Hill Rd, Cornelius, Oregon. By accessing or using our website, you
            agree to be bound by these Terms of Service (“Terms”). If you do not agree to these
            Terms, you may not use our website or purchase our products.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use this website and make purchases. By using our
            website, you represent and warrant that you meet the minimum age requirement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Products & Services</h2>
          <p>
            Stitched PDX provides upcycled denim, upcycled pants, and apparel. Each product is a
            unique, one-of-one piece hand-picked and sewn locally by our team. We deliberately
            source the highest quality 100% cotton denim. The product you receive may differ slightly
            from what is shown in the photos due to the unique nature of each item.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Orders, Payments & Pricing</h2>
          <p>
            All purchases are processed securely via Stripe. Prices are subject to change at any time.
            We reserve the right to modify product descriptions, images, and availability without
            notice. Orders are not confirmed until payment is successfully processed.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Returns & Cancellations</h2>
          <p>
            Returns are accepted within 30 days of purchase provided the item is in original condition,
            unworn, and with all tags attached. Custom or altered items are final sale. Refunds will
            be issued via the original payment method.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Intellectual Property</h2>
          <p>
            All images, designs, artwork, and other content on this website are the property of
            Stitched PDX LLC. Unauthorized copying, distribution, or commercial use of any content
            without prior written permission is strictly prohibited.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. User Conduct</h2>
          <p>
            Users agree not to misuse the website or engage in any unlawful, abusive, or harmful
            activity. This includes attempting to disrupt the website, harassing other users, or
            engaging in fraudulent transactions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Disclaimers & Limitation of Liability</h2>
          <p>
            Products and services are provided "as is." Stitched PDX LLC is not responsible for
            direct, indirect, incidental, or consequential damages arising from use of the website
            or products. We do not guarantee product availability or uninterrupted access.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Indemnification</h2>
          <p>
            Users agree to indemnify and hold harmless Stitched PDX LLC and its affiliates from any
            claims, damages, or losses arising from your violation of these Terms or misuse of the
            website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Oregon. Any disputes arising from
            these Terms or your use of the website shall be resolved in the courts of Oregon.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">11. Modifications</h2>
          <p>
            Stitched PDX LLC reserves the right to update or modify these Terms at any time. The
            updated Terms will be posted on this page, and continued use of the website constitutes
            acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">12. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:hello@stitchedpdx.com" className="underline">hello@stitchedpdx.com</a>.
          </p>
        </section>

        <p className="mt-12 italic">Thank you for supporting our small business – from Sam and Noah</p>
      </div>
    </div>
  );
}
