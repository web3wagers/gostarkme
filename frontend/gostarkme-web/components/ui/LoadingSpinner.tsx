"use client"
import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className="w-14 h-14 border-4 border-gray-300 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity
        }}
      />
    </div>
  )
}