import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    console.log("Form submitted:", formData);
    setTimeout(() => {
        if (formData.email.includes('@')) {
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setFormStatus('error');
        }
    }, 1500);
  };
  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ocean-blue focus:border-ocean-blue sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

  return (
    <div className="bg-off-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-ocean-blue tracking-wide uppercase">Get in Touch</h2>
          <p className="mt-2 text-3xl font-extrabold text-ocean-blue-dark dark:text-ocean-blue-light tracking-tight sm:text-4xl">
            Contact Us
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Have a question or ready to book your tour? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputStyles}/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputStyles}/>
              </div>
               <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className={inputStyles}/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className={inputStyles}></textarea>
              </div>
              <div>
                <button type="submit" disabled={formStatus === 'submitting'} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-ocean-blue hover:bg-ocean-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue disabled:bg-gray-400">
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              <div role="alert" aria-live="assertive" className="text-center h-5">
                {formStatus === 'success' && <p className="text-green-600 dark:text-green-400">Thank you! Your message has been sent.</p>}
                {formStatus === 'error' && <p className="text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>}
              </div>
            </form>
          </div>

          {/* Contact Details & Map */}
          <div>
            <div className="space-y-6 text-lg">
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <i className="fas fa-phone text-ocean-blue dark:text-ocean-blue-light w-6 mr-4" aria-hidden="true"></i>
                    <a href="tel:+19021234567" className="hover:text-ocean-blue-dark dark:hover:text-ocean-blue-light">(902) 123-4567</a>
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <i className="fas fa-envelope text-ocean-blue dark:text-ocean-blue-light w-6 mr-4" aria-hidden="true"></i>
                    <a href="mailto:info@safiseasidetours.com" className="hover:text-ocean-blue-dark dark:hover:text-ocean-blue-light">info@safiseasidetours.com</a>
                </p>
                 <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <i className="fab fa-whatsapp text-ocean-blue dark:text-ocean-blue-light w-6 mr-4" aria-hidden="true"></i>
                    <a href="https://wa.me/19021234567" target="_blank" rel="noopener noreferrer" className="hover:text-ocean-blue-dark dark:hover:text-ocean-blue-light">Message us on WhatsApp</a>
                </p>
                 <p className="flex items-start text-gray-700 dark:text-gray-300">
                    <i className="fas fa-map-marker-alt text-ocean-blue dark:text-ocean-blue-light w-6 mr-4 mt-1" aria-hidden="true"></i>
                    <span>Based in Halifax, Nova Scotia<br/><span className="text-sm text-gray-500">(Tours available province-wide)</span></span>
                </p>
            </div>
            <div className="mt-12">
                 <iframe
                    title="Location of Halifax, Nova Scotia on Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d181783.74313264033!2d-63.76615820468749!3d44.626922900000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a211600351959%3A0x502391043433650!2sHalifax%2C%2C%20NS!5e0!3m2!1sen!2sca!4v1678822839255!5m2!1sen!2sca" 
                    width="100%" 
                    height="350" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-md"
                 ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
