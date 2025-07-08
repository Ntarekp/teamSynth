"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Mail, ArrowLeft, Check, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "sent" | "reset">("email")
  const [email, setEmail] = useState("")
  const [resetData, setResetData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSendReset = () => {
    // Simulate sending reset email
    setStep("sent")
  }

  const handleResetPassword = () => {
    // Simulate password reset
    console.log("Password reset")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">TeamWell Bridge</span>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          {step === "email" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Reset your password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Button className="w-full" onClick={handleSendReset} disabled={!email}>
                  Send reset link
                </Button>

                <div className="text-center">
                  <Link href="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to sign in
                  </Link>
                </div>
              </CardContent>
            </>
          )}

          {step === "sent" && (
            <>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Check your email</CardTitle>
                <CardDescription>We've sent a password reset link to {email}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>

                  <Button variant="outline" onClick={() => setStep("email")} className="w-full">
                    Try different email
                  </Button>

                  <Button onClick={() => setStep("reset")} className="w-full">
                    I have a reset token
                  </Button>
                </div>

                <div className="text-center">
                  <Link href="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to sign in
                  </Link>
                </div>
              </CardContent>
            </>
          )}

          {step === "reset" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Create new password</CardTitle>
                <CardDescription>Enter your new password below</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="pr-10"
                        value={resetData.password}
                        onChange={(e) => setResetData({ ...resetData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="pr-10"
                        value={resetData.confirmPassword}
                        onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {resetData.password &&
                    resetData.confirmPassword &&
                    resetData.password !== resetData.confirmPassword && (
                      <p className="text-sm text-red-600">Passwords do not match</p>
                    )}
                </div>

                <Button
                  className="w-full"
                  onClick={handleResetPassword}
                  disabled={
                    !resetData.password ||
                    !resetData.confirmPassword ||
                    resetData.password !== resetData.confirmPassword
                  }
                >
                  Update password
                </Button>

                <div className="text-center">
                  <Link href="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to sign in
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
