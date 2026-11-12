import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationPage, HomeSection } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ClientStrip } from './components/ClientStrip';
import { ProductsSection } from './components/ProductsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { StartupJourneySection } from './components/StartupJourneySection';
import { ContactSection } from './components/ContactSection';
import { BlogPage } from './components/BlogPage';
import { CareersPage } from './components/CareersPage';
import { ApiDocsPage } from './components/ApiDocsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [activeHomeSection, setActiveHomeSection] = useState<HomeSection>('hero');

  // Smooth section scrolling helper
  const scrollToHomeSection = (sectionId: HomeSection) => {
    setActiveHomeSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to update active home section on scroll and force initial top position
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections: HomeSection[] = ['hero', 'products', 'why-us', 'journey', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveHomeSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#EBEFEE] text-[#4A413C] relative overflow-x-hidden antialiased selection:bg-[#CCB499]/40 selection:text-[#4A413C]">
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activeHomeSection={activeHomeSection}
        scrollToHomeSection={scrollToHomeSection}
      />

      {/* Render Current Webpage View with Smooth Fade Transitions */}
      <main className="relative z-10 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === 'home' && (
              <>
                <HeroSection
                  onNavigatePage={setCurrentPage}
                  onScrollSection={scrollToHomeSection}
                />
                <ClientStrip />
                <ProductsSection />
                <WhyChooseUsSection />
                <StartupJourneySection />
                <ContactSection />
              </>
            )}

            {currentPage === 'blog' && (
              <BlogPage />
            )}

            {currentPage === 'careers' && (
              <CareersPage />
            )}

            {currentPage === 'docs' && (
              <ApiDocsPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigatePage={setCurrentPage}
        onScrollSection={scrollToHomeSection}
      />
    </div>
  );
}
