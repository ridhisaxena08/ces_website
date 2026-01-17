import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Utensils, Shirt, Shield, Activity, Building } from 'lucide-react';

export function HostelFacilitiesPage() {
  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w mx-auto">

        <div className="bg-card p-4 sm:p-4">
          <h1 className="text-4xl md:text-5xl mb-6 text-accent">Hostel Facilities</h1>
          
          <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
            Our hostel provides a safe, comfortable, and conducive environment for students to live and study. 
            We offer modern amenities and facilities designed to make your stay comfortable and enriching.
          </p>

          <div className="mb-10">
            <h2 className="text-3xl mb-6">Room Options</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Choose from a variety of room types based on your preferences and budget:
            </p>

            <div className="space-y-4">
              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl mb-2 text-accent">Single Seater (AC)</h3>
                <p className="text-muted-foreground">Private air-conditioned room with attached bathroom and all modern amenities.</p>
              </div>

              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl mb-2 text-accent">Single Seater (Attached + Non-AC)</h3>
                <p className="text-muted-foreground">Private room with attached bathroom and comfortable living space.</p>
              </div>

              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl mb-2 text-accent">Single Seater (Attached + AC)</h3>
                <p className="text-muted-foreground">Premium private air-conditioned room with attached bathroom.</p>
              </div>

              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl mb-2 text-accent">2-Seater Rooms (Attached + AC)</h3>
                <p className="text-muted-foreground">Shared air-conditioned room with attached bathroom, perfect for fostering friendships.</p>
              </div>

              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl mb-2 text-accent">2-Seater Rooms (Non-AC)</h3>
                <p className="text-muted-foreground">Shared room with attached bathroom and good ventilation.</p>
              </div>

              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl mb-2 text-accent">2-Seater Rooms (AC)</h3>
                <p className="text-muted-foreground">Comfortable shared air-conditioned room with modern facilities.</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl mb-6">Accommodation & Campus Charges Include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Hostel Accommodation</h3>
                  <p className="text-muted-foreground">Comfortable and secure living spaces with 24/7 security.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Mess & Laundry</h3>
                  <p className="text-muted-foreground">Nutritious meals and convenient laundry services.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shirt className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Housekeeping</h3>
                  <p className="text-muted-foreground">Regular cleaning and maintenance of rooms and common areas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Safety & Supervision</h3>
                  <p className="text-muted-foreground">Round-the-clock security and warden supervision.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Basic Amenities</h3>
                  <p className="text-muted-foreground">Yoga, sports, and other recreational activities.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl mb-2">Campus Charges</h3>
                  <p className="text-muted-foreground">Access to all campus facilities and resources.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-yellow-800 leading-relaxed">
              <strong>Note:</strong> Academic scholarships apply only to academic fees and do not cover accommodation or campus charges. 
              Requests for special consideration may be submitted to the Scholarship Board and will be decided as per policy, 
              subject to merit, fund availability, and Board approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
