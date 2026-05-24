import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using QuantumVector AI Solutions' services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Services</h2>
                <p className="text-muted-foreground">
                  QuantumVector AI Solutions provides artificial intelligence and machine learning solutions, including but not limited to chatbots, workflow automation, predictive analytics, and custom AI development services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                <p className="text-muted-foreground mb-3">
                  You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use our services in compliance with applicable laws</li>
                  <li>Not misuse or attempt to gain unauthorized access to our systems</li>
                  <li>Not use our services for any illegal or unauthorized purpose</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content, features, and functionality of our services are owned by QuantumVector AI Solutions and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  QuantumVector AI Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Service Modifications</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify or discontinue our services at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of the Kenya, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, please contact us at:
                  <br />
                  Email: quantumvectorllc@gmail.com
                  <br />
                  Phone: (+254)702-386-899
                </p>
              </section>

              <section>
                <p className="text-sm text-muted-foreground">
                  Last updated: November 2024
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
