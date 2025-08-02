import ContactForm from "@/components/contact-form";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pixel-dark mb-4">Let's Work Together</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Looking for an AI/ML content strategist or technical writer? I'd love to discuss how we can grow your technical community and make complex research accessible.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-pixel p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
