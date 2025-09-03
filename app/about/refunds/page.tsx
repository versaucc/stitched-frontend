'use client';

import MinimalNavbar from '../../../components/navbar/MinimalNavbar';

export default function RefundPolicyPage() {
  return (
    <div className="text-white min-h-screen">
      <MinimalNavbar />

      <div className="pt-32 px-6 lg:px-24 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Refund & Return Policy</h1>

        <section className="mb-6">
          <p>
            At <strong>Stitched PDX</strong>, we take pride in crafting unique, one-of-a-kind
            apparel from upcycled denim and pants. Each product is carefully hand-selected and sewn
            locally by our team to ensure quality and style.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">30-Day Return Window</h2>
          <p>
            You may return items within 30 days of receiving your order. To be eligible for a return:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>The item must remain in its original condition, unworn and unwashed.</li>
            <li>All tags must still be attached.</li>
            <li>Returns must include the original packaging.</li>
          </ul>
          <p>
            Refunds will be processed to the original payment method after we receive and inspect
            the returned item. Please allow up to 7 business days for the refund to appear in your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How to Initiate a Return</h2>
          <p>
            To start a return, please contact our support team at{' '}
            <a href="mailto:hello@stitchedpdx.com" className="underline">
              hello@stitchedpdx.com
            </a>{' '}
            with your order number and the item(s) you wish to return. Our team will provide you
            with instructions and a return shipping address.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Exchanges</h2>
          <p>
            Currently, we do not offer direct exchanges. If you wish to exchange an item, please
            initiate a return and place a new order for the desired item.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Non-Returnable Items</h2>
          <p>
            Custom or personalized products, gift cards, and items marked as final sale are not
            eligible for return.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Shipping Costs</h2>
          <p>
            Return shipping costs are the responsibility of the customer unless the return is due
            to a defective or incorrect item sent by Stitched PDX.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            For questions regarding your order, returns, or our policies, reach out to us at{' '}
            <a href="mailto:hello@stitchedpdx.com" className="underline">
              hello@stitchedpdx.com
            </a>.
          </p>
        </section>

        <p className="mt-12 italic">
          Thank you for supporting Stitched PDX and our commitment to sustainable, handcrafted apparel.
        </p>
      </div>
    </div>
  );
}
