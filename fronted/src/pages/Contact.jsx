import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Newsletter from '../components/Newsletter';

const Contact = () => {
  return (
    <div className="px-4 sm:px-12 pt-8 border-t min-h-[80vh]">
      {/* Title */}
      <div className="text-2xl text-center mb-10">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-10 text-gray-700">
        {/* Image */}
        <div className="w-full md:max-w-[450px]">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="w-full object-cover rounded"
          />
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-5 md:flex-1">
          <div>
            <h2 className="text-lg font-semibold mb-1">Email</h2>
            <p className="text-sm">support@yourstore.com</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Phone</h2>
            <p className="text-sm">+91 98765 43210</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Store Address</h2>
            <p className="text-sm">123 Fashion Street, Mumbai, MH - 400001, India</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Opening Hours</h2>
            <p className="text-sm">Monday – Saturday: 10:00 AM – 8:00 PM</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-16">
        <Newsletter />
      </div>
    </div>
  );
};

export default Contact;
