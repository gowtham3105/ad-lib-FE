import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface UpgradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpgradeDialog({ open, onOpenChange }: UpgradeDialogProps) {
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({
      title: "Payment successful",
      description: "Your account has been upgraded to Pro!",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Upgrade to Pro</DialogTitle>
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">$29</div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Unlimited brand tracking</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
          </div>
          

        </div>
      </DialogContent>
    </Dialog>
  )
}