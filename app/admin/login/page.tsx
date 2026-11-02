"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background font-sans">
      <div className="w-full max-w-md border-4 border-primary p-6 md:p-8 bg-card retro-shadow">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 border-2 border-primary mb-3 bg-background">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-primary tracking-wide">
            [ ADMIN ACCESS ]
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Masukkan password untuk mengelola portofolio & riwayat kerja.
          </p>
        </div>

        {state?.error && (
          <div className="mb-4 p-3 border-2 border-destructive bg-destructive/10 text-destructive text-xs">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-primary mb-2"
            >
              PASSWORD
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full px-3 py-2 bg-background border-2 border-primary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full retro-button text-xs font-bold py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending ? "VERIFYING..." : "ENTER DASHBOARD"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
          >
            ← Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}

