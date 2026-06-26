import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect, useState } from "react";
import { prefetchIdle } from "./components/template/PrefetchLink";
import SmoothScrollProvider from "./components/drywall/SmoothScrollProvider";
import PageTransition from "./components/drywall/PageTransition";
// Universal template booking modal — imported statically (NOT lazy) for < 1 frame mount
import { BookingModal } from "./components/template/BookingModal";
import BackToTop from "./components/drywall/BackToTop";
import StickyCTA from "./components/drywall/StickyCTA";
import ScrollToTop from "./components/ScrollToTop";
import { MetaTags } from "./components/template/MetaTags";
import type { BookingClickHandler, BookingPrefill } from "./config/template/booking-schema";

// ── MASTER TEMPLATE (universal — basis for all 150 sub-brand remixes) ──
const TemplateHome = lazy(() => import("./pages/template/Home"));
const TemplateBrandStory = lazy(() => import("./pages/template/BrandStory"));
const TemplateWhyWeLove = lazy(() => import("./pages/template/WhyWeLoveService"));
const TemplateServices = lazy(() => import("./pages/template/Services"));
const TemplateServiceDetail = lazy(() => import("./pages/template/ServiceDetail"));
const TemplatePricing = lazy(() => import("./pages/template/Pricing"));
const TemplateGallery = lazy(() => import("./pages/template/Gallery"));
const TemplateReviews = lazy(() => import("./pages/template/Reviews"));
const TemplateAbout = lazy(() => import("./pages/template/About"));
const TemplateContact = lazy(() => import("./pages/template/Contact"));
const TemplatePrivacy = lazy(() => import("./pages/template/Privacy"));
const TemplateTerms = lazy(() => import("./pages/template/Terms"));
const TemplateNotFound = lazy(() => import("./pages/template/NotFound"));
const TemplateThankYou = lazy(() => import("./pages/template/ThankYou"));
const TemplateGuarantee = lazy(() => import("./pages/template/Guarantee"));
const TemplateFAQ = lazy(() => import("./pages/template/FAQ"));

// ── AREAS WE SERVE — Local SEO engine (3-tier: hub → region → community) ──
const AreasHub = lazy(() => import("./pages/AreasHub"));
const RegionPage = lazy(() => import("./pages/RegionPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));

const queryClient = new QueryClient();

const AnimatedRoutes = ({ onBookClick }: { onBookClick: BookingClickHandler }) => {
  const location = useLocation();
  useEffect(() => {
    prefetchIdle(["/services", "/pricing", "/contact", "/gallery", "/about"]);
  }, []);
  return (
    <Suspense fallback={null}>
      <Routes location={location}>
        <Route path="/" element={<PageTransition><TemplateHome onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/brand-story" element={<PageTransition><TemplateBrandStory onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/why-we-love" element={<PageTransition><TemplateWhyWeLove onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/services" element={<PageTransition><TemplateServices onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/services/:slug" element={<PageTransition><TemplateServiceDetail onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/services/detail" element={<PageTransition><TemplateServiceDetail onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><TemplatePricing onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><TemplateGallery onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/reviews" element={<PageTransition><TemplateReviews onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/about" element={<PageTransition><TemplateAbout onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><TemplateContact onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/guarantee" element={<PageTransition><TemplateGuarantee onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><TemplateFAQ onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><TemplatePrivacy onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TemplateTerms onBookClick={onBookClick} /></PageTransition>} />
        {/* Areas We Serve — 3-tier local SEO system */}
        <Route path="/areas-we-serve" element={<PageTransition><AreasHub onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/areas-we-serve/:region" element={<PageTransition><RegionPage onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/areas-we-serve/:region/:community" element={<PageTransition><CommunityPage onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/thank-you" element={<PageTransition><TemplateThankYou onBookClick={onBookClick} /></PageTransition>} />
        <Route path="*" element={<PageTransition><TemplateNotFound onBookClick={onBookClick} /></PageTransition>} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill | undefined>(undefined);

  const openBooking: BookingClickHandler = (input) => {
    const next =
      input && typeof input === "object" && !("nativeEvent" in input) && !("currentTarget" in input)
        ? (input as BookingPrefill)
        : undefined;
    setPrefill(next);
    setBookingOpen(true);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* MetaTags must be inside BrowserRouter so useLocation works */}
            <MetaTags />
            <ScrollToTop />
            <SmoothScrollProvider>
              <AnimatedRoutes onBookClick={openBooking} />
              <BackToTop />
              <StickyCTA onBookClick={openBooking} />
              <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} prefill={prefill} />
            </SmoothScrollProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
