import ContactForm from "@/components/contact-form";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pixel-dark mb-4">Let's Create Something Amazing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it and explore how we can bring your ideas to life.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-pixel p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
