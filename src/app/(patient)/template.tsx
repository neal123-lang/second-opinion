"use client";

import { motion } from "motion/react";

export default function PatientDashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="flex-1 flex flex-col min-h-full"
    >
      {children}
    </motion.div>
  );
}

