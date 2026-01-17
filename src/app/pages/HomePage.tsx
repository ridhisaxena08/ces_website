import { useState } from 'react';
import { HeroSection } from '@/app/components/HeroSection';
import { ProgramsSection } from '@/app/components/ProgramsSection';
import { InfoBlock } from '@/app/components/InfoBlock';
import { LeadershipSection } from '@/app/components/LeadershipSection';
import { ProgramsList } from '@/app/components/ProgramsList';
import { StudentCarousel } from '@/app/components/StudentCarousel';
import { CTASection } from '@/app/components/CTASection';
import { CampusSection } from '@/app/components/CampusSection';
import { CareerPaths } from '@/app/components/CareerPaths';
import infoblockImage from 'figma:asset/e71cafeb75095a04bfa277062729385cbf885e42.png';

interface HomePageProps {
  onApplyClick: () => void;
  onCampusVisitClick: () => void;
}

export function HomePage({ onApplyClick, onCampusVisitClick }: HomePageProps) {
  const [isCareerPathsOpen, setIsCareerPathsOpen] = useState(false);
  
  return (
    <>
      <HeroSection onApplyClick={onApplyClick} />
      <ProgramsList onApplyClick={onApplyClick} />
      <LeadershipSection />
      <ProgramsSection />
      <InfoBlock
        title="The Real Power of Our Degree"
        description="Our institution offers more than just education—we provide a transformative experience that prepares you for real-world challenges. With industry partnerships, hands-on learning opportunities, and a network of successful alumni, our degree opens doors to exceptional career prospects. Our graduates consistently achieve higher placement rates and starting salaries, reflecting the value and prestige of our academic programs."
        image={infoblockImage}
        imageOnLeft={false}
        stats={[
          { value: '95%', label: 'Placement Rate' },
          { value: '500+', label: 'Partner Companies' }
        ]}
        ctaText="Explore Career Paths"
        onCtaClick={() => setIsCareerPathsOpen(true)}
      />
      <CampusSection />
      <CTASection 
        onApplyClick={onApplyClick}
        onCampusVisitClick={onCampusVisitClick}
      />
      <CareerPaths isOpen={isCareerPathsOpen} onClose={() => setIsCareerPathsOpen(false)} />
    </>
  );
}