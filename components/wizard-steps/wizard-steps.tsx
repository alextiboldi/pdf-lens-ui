import { CheckCircle } from "lucide-react";

interface WizardStepsProps {
  steps: string[];
  currentStep: number;
}

export default function WizardSteps({ steps, currentStep }: WizardStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="relative flex items-center justify-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="absolute -bottom-6 text-sm whitespace-nowrap">
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-20 h-1 ${
                  index < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
