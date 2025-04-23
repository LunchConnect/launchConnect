"use client";
import React from "react";
import Image from "next/image";
import withHeaderAndFooter from "@/Hoc/withHeaderAndFooter";

const Terms: React.FC = () => {
  return (
    <section>
      <div className="bg-[#08230E] mini-header mini-header-p mini-header-smallscreen px-[4%] md:px-[10%] py-15 text-center text-4xl font-bold text-white pointer-events-none">
        <Image
          src="/assets/images/findjobplus2.png"
          alt=""
          width={982}
          height={497.73}
          className="absolute left-0 top-0"
        />
        <h2 className="cal_sans">Privacy Policy</h2>
        <Image
          src="/assets/images/findjobplus.png"
          alt=""
          width={982}
          height={497.73}
          className="absolute right-0 top-0"
        />
      </div>

      <div className="px-[4%] md:px-[10%] py-10 md:py-20 bg-white">
        <div className="flex flex-col md:flex-row justify-between">
          {" "}
          <h1 className="text-[#243428] cal_sans text-3xl">
            Welcome to Launch Connect!
          </h1>
          <div className="DM_sans text-start">
            Effective Date:{" "}
            <span className="text-[#1AC23F] font-semibold">
              26th April, 2025
            </span>{" "}
          </div>
        </div>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-4 text-sm text-[#606060] DM_sans">
            This Privacy Policy explains how we collect, use, disclose, and
            protect your personal information when you use our web platform
            (“Platform” or “Service”). Launch Connect is owned and operated by
            Stanix Consult and we are committed to protecting your privacy and
            ensuring you have a safe experience while using our services.
            <p className="pt-10">
              {" "}
              By using Launch Connect, you agree to the collection and use of
              information in accordance with this Privacy Policy.
            </p>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">Who We Are</h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-4 text-sm text-[#606060] DM_sans">
            Launch Connect is a web-based platform that connects startups and
            with job seekers, interns, volunteers, and career switchers looking
            for real-world experience, especially those with limited work
            history or non-traditional career paths.
            <p className="pt-10">
              {" "}
              If you have questions, you can contact us at:
            </p>
            <p className="pt-10">
              Email:{" "}
              <a
                href="mailto:Stanixconsult@gmail.com"
                className="text-[#6464F9] hover:underline"
              >
                Stanixconsult@gmail.com
              </a>
            </p>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          Information We Collect
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <h3 className="mb-5">
              We collect the following types of information when you use our
              platform:
            </h3>
            <h3 className="font-semibold mb-5">A. Personal Information</h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Resume</li>
              <li>Portfolio links</li>
              <li>Skills & interest </li>
              <li>Location or region</li>
            </ul>

            <h3 className="font-semibold pb-5 pt-5">B. Account Information</h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>Username and password</li>
              <li>Profile details you choose to add</li>
              <li>Account Preference</li>
            </ul>

            <h3 className="font-semibold pb-5 pt-5">
              C. Usage & Technical Data
            </h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>IP address</li>
              <li>Device information (browser, operating system)</li>
              <li>Pages visited</li>
              <li>Actions taken (e.g., profile creation, job applications)</li>
              <li>Date and time of access</li>
            </ul>

            <h3 className="font-semibold pb-5 pt-5">D. Cookies and Tracking</h3>
            <h2>
              We use cookies and similar technologies to improve user
              experience, track usage patterns, and manage sessions. You can
              manage cookie preferences in your browser settings.
            </h2>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          How We Use Your Information
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <h3 className="mb-5">We use your information to:</h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>Create and manage your account</li>
              <li>Match you with relevant job or internship opportunities</li>
              <li>Allow startups to view applicant profiles</li>
              <li>Communicate updates</li>
              <li>Improve our platform and user experience</li>
              <li>Conduct internal research and analytics</li>
              <li>Enforce our Terms of Use</li>
              <li>Comply with legal obligations</li>
            </ul>
            <h3 className="pt-5">We do not sell your personal information.</h3>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          Data Security
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <h3 className="mb-5">
              We take data protection seriously. Measures include:
            </h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>SSL encryption during data transmission.</li>
              <li>Secure data storage and password protection.</li>
              <li>
                Limited access to personal data by authorized personnel only.
              </li>
            </ul>
            <h3 className="pt-5">
              Despite our efforts, no method of transmission or storage is 100%
              secure. We encourage users to use strong passwords and keep their
              login information safe.
            </h3>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          Cookies Policy
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <h3 className="mb-5">Cookies help us:</h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>Remember your preferences</li>
              <li>Track platform usage</li>
              <li>Keep you logged in during your session</li>
            </ul>
            <h3 className="pt-5">
              You can manage or disable cookies in your browser settings. Please
              note that disabling cookies may limit some features
              of the platform.
            </h3>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          Third-Party Links
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-4 text-sm text-[#606060] DM_sans">
            Our platform may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites.
            Please read their privacy policies before sharing any information.
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          Changes to This Privacy Policy
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-4 text-sm text-[#606060] DM_sans">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with a new “Last Updated” date. We encourage you
            to review this policy periodically.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default withHeaderAndFooter(Terms);
