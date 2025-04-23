"use client";
import React from 'react'
import Image from "next/image";
import withHeaderAndFooter from "@/Hoc/withHeaderAndFooter";

const Terms:React.FC = () => {
  return (
    <section>
      <div className="bg-[#08230E] mini-header mini-header-p mini-header-smallscreen px-[4%] md:px-[10%] py-15 text-center text-4xl font-bold text-white pointer-events-none cal_sans relative">
        <Image
          src="/assets/images/findjobplus2.png"
          alt=""
          width={982}
          height={497.73}
          className="absolute left-0 top-0"
        />
        <h2>Terms of Service</h2>
        <Image
          src="/assets/images/findjobplus.png"
          alt=""
          width={982}
          height={497.73}
          className="absolute right-0 top-0"
        />
      </div>

      <div className="px-[4%] md:px-[10%] py-10 md:py-20 bg-white">
        <h1 className="text-[#243428] cal_sans text-2xl">1. Introduction</h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-4 text-sm text-[#606060] DM_sans">
            Welcome to Launch Connect. Our platform connects job seekers
            (interns, fresh graduates, volunteers, and career switchers) with
            startups and companies seeking talent for their projects and
            products. This service is currently free to use.{" "}
            <p className="pt-5">
              {" "}
              By accessing or using Launch Connect you agree to these{" "}
              <span className="text-[#1AC23F] font-semibold">
                Terms of Service ("Terms").
              </span>{" "}
              If you do not agree, please do not use the platform.
            </p>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          2. Definitions
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>
                <span className="text-[#1AC23F] font-semibold">"Platform"</span>{" "}
                refers to Launch Connect, including its website and services.
              </li>
              <li>
                <span className="text-[#1AC23F] font-semibold">
                  "User", "You"
                </span>{" "}
                or <span className="text-[#1AC23F] font-semibold">"Your"</span>{" "}
                refers to any individual or company using the Platform.
              </li>
              <li>
                <span className="text-[#1AC23F] font-semibold">
                  "Job Seeker"
                </span>{" "}
                refers to individuals seeking internship, volunteer, or
                career-switching opportunities.
              </li>
              <li>
                <span className="text-[#1AC23F] font-semibold">"Company"</span>{" "}
                refers to startups or businesses seeking talent for their
                projects.
              </li>
              <li>
                <span className="text-[#1AC23F] font-semibold">"Project"</span>{" "}
                refers to tasks or roles posted by Companies.
              </li>
            </ul>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          3. Eligibility
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <h3 className="mb-5">To use Launch Connect, you must:</h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>
                Be at least{" "}
                <span className="text-[#1AC23F] font-semibold">
                  <i>18 years old</i>
                </span>{" "}
                or have legal consent.
              </li>
              <li>
                Provide{" "}
                <span className="text-[#1AC23F] font-semibold">
                  <i>accurate</i>
                </span>{" "}
                <span className="text-[#1AC23F] font-semibold">
                  <i>complete registration information.</i>
                </span>{" "}
              </li>
              <li>
                Comply with{" "}
                <span className="text-[#1AC23F] font-semibold">
                  <i>applicable laws and regulations</i>
                </span>
              </li>
            </ul>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          4. User Responsibilities
        </h1>
        <div className="flex flex-col md:flex-row gap-5 mt-5 w-full">
          <div className="border border-[#E7EFE8] rounded-2xl w-full">
            <h2 className="p-9 text-sm text-[#606060] DM_sans">
              <h3 className="mb-5 font-semibold">For Job Seekers:</h3>
              <ul className="list-disc list-inside space-y-4 text-[#344054]">
                <li>
                  Ensure your{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>profile</i>
                  </span>{" "}
                  and{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>credentials</i>
                  </span>{" "}
                  are accurate.
                </li>
                <li>
                  Communicate{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>professtionally</i>
                  </span>{" "}
                  with Companies.
                </li>
                <li>
                  Understand that all positions listed are{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>unpaid.</i>
                  </span>
                </li>
              </ul>
            </h2>
          </div>

          <div className="border border-[#E7EFE8] rounded-2xl w-full">
            <h2 className="p-9 text-sm text-[#606060] DM_sans">
              <h3 className="mb-5 font-semibold">For Company:</h3>
              <ul className="list-disc list-inside space-y-4 text-[#344054]">
                <li>
                  Accurately describe{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>job roles, expectations,</i>
                  </span>{" "}
                  and{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>project timelines.</i>
                  </span>{" "}
                </li>
                <li>
                  Not{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>exploit</i>
                  </span>{" "}
                  or{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>misrepresent</i>
                  </span>{" "}
                  opportunities
                </li>
                <li>
                  Comply with all{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>applicable labor</i>
                  </span>{" "}
                  and{" "}
                  <span className="text-[#1AC23F] font-semibold">
                    <i>employment laws.</i>
                  </span>
                </li>
              </ul>
            </h2>
          </div>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          6. No Employment Guarantee
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>
                Launch Connect{" "}
                <span className="text-[#FB3748] font-semibold">
                  <i>only</i>
                </span>{" "}
                facilitates connections and{" "}
                <span className="text-[#FB3748] font-semibold">
                  <i>does not</i>
                </span>{" "}
                guarantee employment or project success.
              </li>
              <li>
                We are{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>not</i>
                </span>{" "}
                responsible for any{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>agreements</i>
                </span>{" "}
                made between{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>Job Seekers</i>
                </span>{" "}
                and{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>Companies.</i>
                </span>{" "}
              </li>
            </ul>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          7. Disclaimers & Liability
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>
                The platform is provided{" "}
                <span className="text-[#1AC23F] font-semibold">
                  <i>"as is,"</i>
                </span>{" "}
                without warranties of any kind.
              </li>
              <li>
                We are{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>not</i>
                </span>{" "}
                liable for any{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>loss, damages,</i>
                </span>{" "}
                or{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>disputes</i>
                </span>{" "}
                arising from platform use.
              </li>
              <li>
                Users interact at their own{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>risk.</i>
                </span>
              </li>
            </ul>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          8. Termination
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-9 text-sm text-[#606060] DM_sans">
            <h3 className="mb-5">
              We reserve the right to suspend or terminate accounts if:
            </h3>
            <ul className="list-disc list-inside space-y-4 text-[#344054]">
              <li>
                Users{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>violate</i>
                </span>{" "}
                these Terms.
              </li>
              <li>
                <span className="text-[#fb3748] font-semibold">
                  <i>Fraudulent activities</i>
                </span>{" "}
                are detected.
              </li>
              <li>
                The platform undergoes{" "}
                <span className="text-[#1AC23F] font-semibold">
                  <i>structural changes</i>
                </span>{" "}
                or{" "}
                <span className="text-[#fb3748] font-semibold">
                  <i>shutdown.</i>
                </span>{" "}
              </li>
            </ul>
          </h2>
        </div>

        <h1 className="text-[#243428] cal_sans text-2xl mt-10">
          9. Changes to Terms
        </h1>
        <div className="border border-[#E7EFE8] rounded-2xl mt-5">
          <h2 className="p-4 text-sm text-[#606060] DM_sans">
            We may update these Terms at any time. Continued use of the platform
            after changes implies acceptance.
          </h2>
        </div>
      </div>
    </section>
  );
}

export default withHeaderAndFooter(Terms);



