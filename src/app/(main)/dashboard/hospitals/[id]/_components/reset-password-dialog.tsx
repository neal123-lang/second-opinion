"use client";

import { useState } from "react";

import { KeyRound } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { hospitalService } from "@/lib/services/hospital-service";
import { getApiErrorMessage } from "@/lib/utils";

export function ResetPasswordDialog({ hospitalId }: { hospitalId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      toast.error("Password must be at least 4 characters.");
      return;
    }

    try {
      setLoading(true);
      await hospitalService.resetHospitalPassword(hospitalId, newPassword);
      toast.success("Password reset successfully.");
      setOpen(false);
      setNewPassword("");
    } catch (error: any) {
      console.error(error);
      toast.error(getApiErrorMessage(error, "Failed to reset password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <KeyRound className="mr-2 h-4 w-4" />
          Reset Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Reset Admin Password</DialogTitle>
            <DialogDescription>Enter a new password for this hospital administrator.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Field className="gap-1.5">
              <FieldLabel>New Password</FieldLabel>
              <Input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
              />
            </Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
