import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export function SelectionProcessPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-accent hover:text-accent-foreground mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-card rounded-xl shadow-lg p-8 sm:p-12">
          <h1 className="text-4xl md:text-5xl mb-6 text-accent">Selection Process</h1>
          
          <p className="text-lg mb-8 leading-relaxed">
            Admission under The SEEP program does not involve any written exam or entrance test. Students are selected through a simple and transparent evaluation process.
          </p>

          <div className="bg-accent/10 p-6 rounded-lg mb-10">
            <p className="text-center text-lg">
              <strong>No prior coaching is required.</strong>
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl mb-6">Our Selection Philosophy</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We believe potential is more important than performance in one exam.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-accent/5 p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg mb-1">Interest</h3>
                  <p className="text-sm text-muted-foreground">Genuine passion for learning</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-accent/5 p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg mb-1">Curiosity</h3>
                  <p className="text-sm text-muted-foreground">Eagerness to explore and question</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-accent/5 p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg mb-1">Learning Mindset</h3>
                  <p className="text-sm text-muted-foreground">Growth-oriented approach</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-accent/5 p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg mb-1">Academic Sincerity</h3>
                  <p className="text-sm text-muted-foreground">Dedication and commitment</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl mb-6">How Selection for The SEEP Is Done</h2>
            
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <div className="text-center">
                <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">1</div>
                <p className="text-sm">Apply online</p>
              </div>
              <div className="text-2xl text-accent">→</div>
              <div className="text-center">
                <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">2</div>
                <p className="text-sm">Upload documents</p>
              </div>
              <div className="text-2xl text-accent">→</div>
              <div className="text-center">
                <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">3</div>
                <p className="text-sm">Receive call</p>
              </div>
              <div className="text-2xl text-accent">→</div>
              <div className="text-center">
                <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">4</div>
                <p className="text-sm">Get confirmation</p>
              </div>
              <div className="text-2xl text-accent">→</div>
              <div className="text-center">
                <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">5</div>
                <p className="text-sm">Join Campus</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              At The SEEP, we do not merely offer scholarships — we invest in future nation builders.
            </p>

            <p className="mb-8 leading-relaxed">
              Our selection process is designed to identify students who are genuinely committed to IIT-level learning, discipline, and excellence. The objective is to ensure that every scholarship awarded by the foundation supports not just an individual student, but contributes to the intellectual and technological growth of the nation.
            </p>

            <div className="space-y-8">
              <div className="bg-accent/5 p-6 rounded-lg">
                <h3 className="text-2xl mb-4">Stage 1: Online Application & Document Submission</h3>
                <p className="mb-4 leading-relaxed">
                  The student first fills out the online application form and uploads the following documents:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Class 10th marksheet</li>
                  <li>Class 12th marksheet</li>
                  <li>Caste certificate (OBC-NCL / EWS / SC / ST)</li>
                  <li>Income certificate Format / ITR</li>
                  <li>Aadhaar card</li>
                </ul>
                <p className="text-sm text-muted-foreground italic">
                  Once submitted, our team reviews all documents (Document Number 3 and 4 are mandatory for scholarships).
                </p>
              </div>

              <div className="bg-accent/5 p-6 rounded-lg">
                <h3 className="text-2xl mb-4">Stage 2: Call for Eligible Students</h3>
                <p className="mb-4 leading-relaxed">
                  If the documents are found correct and the student is eligible:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>The student is contacted by phone</li>
                  <li>A short interaction is done to understand interest and commitment</li>
                  <li>This is not an exam, only a conversation</li>
                </ul>
              </div>

              <div className="bg-accent/5 p-6 rounded-lg">
                <h3 className="text-2xl mb-4">Final Selection & Email Confirmation</h3>
                <p className="mb-4 leading-relaxed">
                  Students who are selected after the call:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Receive an official email confirmation</li>
                  <li>Get complete instructions for admission formalities</li>
                  <li>Are guided step-by-step for enrollment and campus joining</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-accent text-accent-foreground p-6 rounded-lg mb-8">
            <h3 className="text-2xl mb-4">We seek students who demonstrate:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Academic seriousness</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Learning commitment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Career-oriented mindset</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Willingness to grow</span>
              </div>
            </div>
          </div>

          <div className="text-center bg-accent/10 p-6 rounded-lg">
            <p className="text-lg">
              <strong>Every scholarship is viewed as a responsibility — not just financial support</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
