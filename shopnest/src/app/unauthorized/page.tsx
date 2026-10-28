
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ShieldAlert,
  LockKeyhole,
  ArrowLeft,
  Home,
  ShieldCheck,
} from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 px-4 py-10">

      {/* Background Effects */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-red-400/20 bg-red-500/10 shadow-lg shadow-red-500/10"
        >
          <ShieldAlert className="h-12 w-12 text-red-400" />
        </motion.div>

        {/* Status Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300">
          <LockKeyhole className="h-4 w-4" />
          403 · Access Restricted
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Access Denied
          <span className="mt-2 block bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
            Unauthorized Access
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-slate-300">
          Sorry, you don't have permission to access this page.
          Please sign in with an authorized account or contact your administrator.
        </p>

        {/* Info Box */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

          <div>
            <h3 className="text-sm font-semibold text-white">
              Your account is protected
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              This restriction helps keep your account and data secure.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-xs tracking-wide text-slate-500">
            ERROR CODE: 403 · FORBIDDEN
          </p>
        </div>
      </motion.div>
    </div>
  );
}

