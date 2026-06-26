import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const ease = [0.76, 0, 0.24, 1] as const;

const overlayVariants: Variants = {
  initial: { clipPath: "inset(0 0 0 0)" },
  animate: {
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.55, ease: ease as unknown as [number, number, number, number], delay: 0.05 },
  },
  exit: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 0.5, ease: ease as unknown as [number, number, number, number] },
  },
};

const contentVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const accentLineVariants: Variants = {
  initial: { scaleY: 1 },
  animate: {
    scaleY: 0,
    transition: { duration: 0.45, ease: ease as unknown as [number, number, number, number], delay: 0.1 },
  },
  exit: {
    scaleY: 1,
    transition: { duration: 0.4, ease: ease as unknown as [number, number, number, number] },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => (
  <>
    <motion.div
      className="fixed inset-0 z-50 bg-asphalt grain-overlay pointer-events-none"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-px bg-copper/40 origin-top"
        variants={accentLineVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </motion.div>

    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  </>
);

export default PageTransition;
