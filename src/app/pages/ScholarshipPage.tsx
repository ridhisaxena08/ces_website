import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ScholarshipPage() {
  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen mx-auto">        
        <div className="bg-card rounded-xl p-8 sm:p-12">
          <h1 className="text-4xl md:text-5xl mb-6 text-accent">Empowering Girls to Become Future Leaders</h1>
          
          <p className="text-lg mb-8 leading-relaxed">
            The <strong>"Chandrawati Education Society"</strong> under The SEEP (Student Educational Empowerment Program) is a flagship scholarship initiative dedicated to identifying and nurturing talented girls from all backgrounds and transforming them into confident, skilled, and academically strong "IIT scholars".
          </p>

          <div className="mb-10">
            <h2 className="text-3xl mb-4">Academic & Financial Assistance</h2>
            <p className="text-muted-foreground leading-relaxed">
              It is a full academic empowerment system designed to remove barriers, provide mentorship, and ensure long-term success.
            </p>
          </div>

          <div className="flex gap-4 mb-10 flex-wrap">
            <span className="bg-accent/10 text-accent px-4 py-2 rounded-full">Transparent</span>
            <span className="bg-accent/10 text-accent px-4 py-2 rounded-full">Affordable</span>
            <span className="bg-accent/10 text-accent px-4 py-2 rounded-full">Merit-Based</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl mb-4">Scholarship & Fee</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The total fee at CES is broadly divided into two main components:
            </p>

            <div className="bg-accent/5 p-6 rounded-lg mb-8">
              <h3 className="text-2xl mb-4">1. Academic Fee</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The academic fee under The CES is determined based on the student's scholarship eligibility status.
              </p>
              <p className="mb-4 leading-relaxed">
                <strong>Scholarships of up to 100%</strong> (Absolute Zero Academic Fee) will be awarded to eligible students enrolled in the IIT BS + B.Tech./BCA. Dual Degree Program, subject to fulfillment of the prescribed criteria. The academic fee covers all charges applicable to the IIT BS degree (excluding the one time application fee) and the university degree as prescribed by the respective institutions.
              </p>
              <p className="mb-4 leading-relaxed">
                Scholarship eligibility shall be evaluated based on the following parameters:
              </p>
              
              <div className="bg-white p-6 rounded-lg mb-4">
                <h4 className="text-xl mb-3">Selection Criteria – Academic Merit Only</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Selection is strictly based on academic performance in Class 12 and Class 10 examinations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg mb-4">
                <h4 className="text-xl mb-3">Scholarship Amount – Based on Financial Need</h4>
                <p className="text-muted-foreground leading-relaxed">
                  The amount of scholarship awarded shall depend on the student's annual family income and category.
                </p>
              </div>

              <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                <p className="text-center">
                  Check Your Scholarship Based-on Annual Family Income, Category and Click Scholarship Card.
                </p>
              </div>
            </div>

            <div className="bg-accent/5 p-6 rounded-lg">
              <h3 className="text-2xl mb-4">2. Accommodation & Campus Charges</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                These charges are uniform for all students and depend only on the type of room occupancy chosen.
              </p>

              <h4 className="text-xl mb-3">a) Available Options:</h4>
              <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground">
                <li>Single Seater (AC)</li>
                <li>Single Seater (Attached+Non-AC)</li>
                <li>Single Seater (Attached+AC)</li>
                <li>2-Seater Rooms (Attached+AC)</li>
                <li>2-Seater Rooms (Non-AC)</li>
                <li>2-Seater Rooms (AC)</li>
              </ul>

              <h4 className="text-xl mb-3">b) Accommodation & Campus Charges Includes:</h4>
              <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground">
                <li>Hostel Accommodation</li>
                <li>Mess & Laundry</li>
                <li>Housekeeping</li>
                <li>Safety & supervision</li>
                <li>Basic amenities (Yoga, Sports & Other Activities)</li>
                <li>Campus Charges (All Campus Features)</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-sm text-yellow-800 leading-relaxed">
                  <strong>Note:</strong> Academic scholarships apply only to academic fees and do not cover accommodation or campus charges. Requests for special consideration may be submitted to the Scholarship Board and will be decided as per policy, subject to merit, fund availability, and Board approval.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent text-accent-foreground p-6 rounded-lg text-center">
            <p className="text-lg">
              The CES follows a clear and student-friendly scholarship & fee structure designed to ensure fairness, transparency, and accessibility for all students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
