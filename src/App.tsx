import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useState } from "react";
import SmoothScrollProvider from "./components/drywall/SmoothScrollProvider";
import PageTransition from "./components/drywall/PageTransition";
// Universal template booking modal — imported statically (NOT lazy) for < 1 frame mount
import { BookingModal } from "./components/template/BookingModal";
import BackToTop from "./components/drywall/BackToTop";
import StickyCTA from "./components/drywall/StickyCTA";
import ScrollToTop from "./components/ScrollToTop";
import { MetaTags } from "./components/template/MetaTags";
import type { BookingClickHandler, BookingPrefill } from "./config/template/booking-schema";

// ── AREAS WE SERVE — Local SEO engine (3-tier: hub → region → community) ──
const AreasHub = lazy(() => import("./pages/AreasHub"));
const RegionPage = lazy(() => import("./pages/RegionPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));

// ── BLOG — World-class editorial / Local SEO hub (ported from VeePo.ca) ──
const BlogHub = lazy(() => import("./pages/BlogHub"));
const BlogHubPage = lazy(() => import("./pages/BlogHubPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const AnimatedRoutes = ({ onBookClick }: { onBookClick: BookingClickHandler }) => {
  const location = useLocation();
  return (
    <Suspense fallback={null}>
      <Routes location={location}>
        <Route path="/" element={<Navigate to="/areas-we-serve" replace />} />
        {/* Areas We Serve — 3-tier local SEO system (sole surviving surface) */}
        <Route path="/areas-we-serve" element={<PageTransition><AreasHub onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/areas-we-serve/:region" element={<PageTransition><RegionPage onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/areas-we-serve/:region/:community" element={<PageTransition><CommunityPage onBookClick={onBookClick} /></PageTransition>} />
        {/* Blog — hub index, sub-hub clusters, and individual posts */}
        <Route path="/blog" element={<PageTransition><BlogHub onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/blog/:hubSlug" element={<PageTransition><BlogHubPage onBookClick={onBookClick} /></PageTransition>} />
        <Route path="/blog/post/:slug" element={<PageTransition><BlogPost onBookClick={onBookClick} /></PageTransition>} />
        <Route path="*" element={<Navigate to="/areas-we-serve" replace />} />
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
