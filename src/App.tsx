import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import SmoothScrollProvider from "./components/drywall/SmoothScrollProvider";
import PageTransition from "./components/drywall/PageTransition";
import BackToTop from "./components/drywall/BackToTop";
import ScrollToTop from "./components/ScrollToTop";
import { MetaTags } from "./components/template/MetaTags";

// ── AREAS WE SERVE — Local SEO engine (3-tier: hub → region → community) ──
const AreasHub = lazy(() => import("./pages/AreasHub"));
const RegionPage = lazy(() => import("./pages/RegionPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));

// ── BLOG — World-class editorial / Local SEO hub (ported from VeePo.ca) ──
const BlogHub = lazy(() => import("./pages/BlogHub"));
const BlogHubPage = lazy(() => import("./pages/BlogHubPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={null}>
      <Routes location={location}>
        <Route path="/" element={<Navigate to="/areas-we-serve" replace />} />
        {/* Areas We Serve — 3-tier local SEO system (sole surviving surface) */}
        <Route path="/areas-we-serve" element={<PageTransition><AreasHub /></PageTransition>} />
        <Route path="/areas-we-serve/:region" element={<PageTransition><RegionPage /></PageTransition>} />
        <Route path="/areas-we-serve/:region/:community" element={<PageTransition><CommunityPage /></PageTransition>} />
        {/* Blog — hub index, sub-hub clusters, and individual posts */}
        <Route path="/blog" element={<PageTransition><BlogHub /></PageTransition>} />
        <Route path="/blog/:hubSlug" element={<PageTransition><BlogHubPage /></PageTransition>} />
        <Route path="/blog/:hubSlug/:postSlug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="*" element={<Navigate to="/areas-we-serve" replace />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
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
              <AnimatedRoutes />
              <BackToTop />
            </SmoothScrollProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
