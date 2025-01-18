import { SignIn } from "@clerk/clerk-react"

export function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
     

      <div className="mt-8 mx-auto sm:w-full sm:max-w-md">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-black hover:bg-gray-800 text-sm normal-case",
                card: "shadow-none",
                socialButtonsBlockButton: 
                  "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
                socialButtonsBlockButtonText: 
                  "text-gray-500 text-sm font-medium",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500 text-sm",
                formFieldLabel: "text-gray-700",
                formFieldInput: 
                  "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm",
                footerActionLink: 
                  "font-medium text-black hover:text-gray-800",
              },
            }}
          />
      </div>
    </div>
  )
}