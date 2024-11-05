"use client"
import { motion } from "framer-motion"

export default function Component() {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full"
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