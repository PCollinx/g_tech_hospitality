"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: () => void;
  userData?: {
    name: string;
    idNumber: string;
    idType: string;
    expires: string;
    riskScore?: number;
    ninVerified?: boolean;
  };
}

export default function VerificationDialog({
  open,
  onOpenChange,
  onContinue,
  userData = {
    name: "Daniel Kyle",
    idNumber: "****6789",
    idType: "NIN",
    expires: "15/03/2030",
  },
}: VerificationDialogProps) {
  const handleContinue = () => {
    onContinue?.();
    onOpenChange(false);
  };

  const riskScore = userData?.riskScore ?? 10;
  const isLowRisk = riskScore <= 50;
  const riskColor = isLowRisk ? "#039855" : riskScore <= 75 ? "#F79009" : "#D92D20";
  const riskBgColor = isLowRisk ? "#ecfdf3" : riskScore <= 75 ? "#FEF3C7" : "#FEE4E2";
  const riskBorderColor = isLowRisk ? "#12b76a" : riskScore <= 75 ? "#F79009" : "#D92D20";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">Verification Results</DialogTitle>
        <div className="bg-white flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center">
            {/* Success Icon */}
            <div className="bg-[#d1fadf] flex items-center p-3 rounded-full">
              <div className="bg-[#039855] flex items-center justify-center p-3.5 rounded-full w-[55px] h-[55px]">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8335 2.16699C7.77016 2.16699 3.66683 6.27033 3.66683 11.3337C3.66683 16.397 7.77016 20.5003 12.8335 20.5003C17.8968 20.5003 22.0002 16.397 22.0002 11.3337C22.0002 6.27033 17.8968 2.16699 12.8335 2.16699ZM12.8335 22.167C6.85016 22.167 2.00016 17.317 2.00016 11.3337C2.00016 5.35033 6.85016 0.500326 12.8335 0.500326C18.8168 0.500326 23.6668 5.35033 23.6668 11.3337C23.6668 17.317 18.8168 22.167 12.8335 22.167Z"
                    fill="white"
                  />
                  <path
                    d="M11.1668 15.167L7.3335 11.3337L8.51683 10.1503L11.1668 12.8003L17.1502 6.81699L18.3335 8.00033L11.1668 15.167Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3 text-center w-full">
              <h2 className="font-semibold text-[24px] sm:text-[30px] leading-8 sm:leading-[38px] text-[#181d27]">
                Verification Results
              </h2>
              <p className="text-sm sm:text-base text-[#535862] leading-5 sm:leading-6">
                Your details have been reviewed successfully. Everything checks
                out and your account is now fully verified.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            {/* Risk Score Card */}
            <div
              className="rounded-2xl p-4 relative overflow-hidden border"
              style={{
                backgroundColor: riskBgColor,
                borderColor: riskBorderColor,
              }}
            >
              {/* Background Check Icon */}
              <div className="absolute -bottom-11 -right-4 opacity-[0.06] w-[176px] h-[176px]">
                <svg
                  width="176"
                  height="176"
                  viewBox="0 0 176 176"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M88 44C63.7 44 44 63.7 44 88C44 112.3 63.7 132 88 132C112.3 132 132 112.3 132 88C132 63.7 112.3 44 88 44ZM75.68 107.36L57.2 88.88L63.36 82.72L75.68 95.04L112.64 58.08L118.8 64.24L75.68 107.36Z"
                    fill={riskColor}
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex flex-col">
                  <p className="text-sm text-black mb-1">Risk Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-[#d5d7da] rounded-full relative">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-full"
                        style={{
                          backgroundColor: riskColor,
                          width: `${Math.min(riskScore, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#414651]">
                      {riskScore}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#717680]">
                  {isLowRisk ? "Low Risk" : riskScore <= 75 ? "Medium Risk" : "High Risk"} •{" "}
                  {userData?.ninVerified ? "Verified" : "Pending Verification"}
                </p>
              </div>
            </div>

            {/* Verification Results */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-base text-[#181d27]">
                  Verification Results
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#717680]">Name</span>
                    <span className="font-medium text-[#252b37]">
                      {userData.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#717680]">ID Number</span>
                    <span className="font-medium text-[#252b37]">
                      {userData.idNumber}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#717680]">ID Type</span>
                    <span className="font-medium text-[#252b37]">
                      {userData.idType}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#717680]">Expires</span>
                    <span className="font-medium text-[#252b37]">
                      {userData.expires}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 sm:px-[18px] py-2.5 rounded-[50px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
            >
              Continue to Check-In
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
