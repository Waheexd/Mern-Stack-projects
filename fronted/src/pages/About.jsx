import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <div className="px-4 sm:px-12">
      {/* ABOUT US TITLE */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* ABOUT US CONTENT */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px] object-cover rounded"
          alt="About us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600">
          <p>
            At <b className="text-gray-800">FOREVER</b>, we believe in making your
            shopping experience fast, easy, and enjoyable. We bring together
            quality products, seamless service, and a commitment to customer
            satisfaction all in one place.
          </p>
          <div>
            <b className="text-gray-800 text-lg">OUR MISSION</b>
            <p className="mt-2">
              Our mission is to revolutionize the e-commerce space by providing
              a curated shopping experience with speed and reliability. We
              strive to be your go-to platform for all your needs with
              guaranteed value.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US TITLE */}
      <div className="text-2xl text-center py-6">
        <Title text1={'WHY CHOOSE'} text2={'US'} />
      </div>

      {/* WHY CHOOSE US - FEATURES */}
      <div className="flex flex-col md:flex-row gap-6 text-gray-600">
        {/* Quality Assurance */}
        <div className="border px-6 md:px-10 py-8 flex-1 rounded-md shadow-sm hover:shadow-md transition">
          <b className="text-lg">Quality Assurance</b>
          <p className="mt-2">
            We carefully vet every product and seller to ensure the highest
            standards. No compromise—only top-quality goods.
          </p>
        </div>

        {/* Convenience */}
        <div className="border px-6 md:px-10 py-8 flex-1 rounded-md shadow-sm hover:shadow-md transition">
          <b className="text-lg">Convenience</b>
          <p className="mt-2">
            From order to delivery, our platform is built for ease. With smart
            filters, fast checkout, and real-time tracking, shopping has never
            been easier.
          </p>
        </div>

        {/* Customer Service */}
        <div className="border px-6 md:px-10 py-8 flex-1 rounded-md shadow-sm hover:shadow-md transition">
          <b className="text-lg">Exceptional Customer Service</b>
          <p className="mt-2">
            Our support team is always ready to help. From inquiries to issue
            resolution, we go the extra mile to make you smile.
          </p>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="mt-16">
        <Newsletter />
      </div>
    </div>
  );
};

export default About;
