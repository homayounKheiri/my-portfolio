"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type DrawerProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  type?: "default" | "fullscreen"
}

export function Drawer({
  open,
  onClose,
  children,
  className,
  type = "default",
}: DrawerProps) {
  const isFullscreen = type === "fullscreen"

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={onClose}
            onTouchStart={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={cn(
              "fixed z-[61] shadow-2xl",
              isFullscreen
                ? "inset-0 h-dvh w-full"
                : "inset-x-0 bottom-0 max-h-[90dvh] overflow-hidden rounded-t-2xl",
              className,
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
          >
            {!isFullscreen && (
              <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-muted" />
            )}

            {/* Close */}
            <button
              type="button"
              aria-label="Close drawer"
              onClick={onClose}
              className="absolute right-4 top-4 z-[100] flex size-10 items-center justify-center rounded-full bg-black/60 text-white"
            >
              <X className="size-5" />
            </button>

            {/* Content */}
            <div className="h-auto overflow-auto">
              {children}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}