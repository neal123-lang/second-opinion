"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ImagePlus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { hospitalService } from "@/lib/services/hospital-service";
import { getApiErrorMessage } from "@/lib/utils";

const formSchema = z.object({
  hospital_name: z.string().min(1, "Hospital name is required"),
  hospital_code: z.string().min(1, "Code is required"),
  registration_number: z.string().min(1, "Registration number is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(1, "Pincode is required"),
  admin_name: z.string().min(1, "Admin name is required"),
  admin_email: z.string().email("Invalid admin email"),
  admin_mobile: z.string().min(1, "Admin mobile is required"),
  admin_password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function AddHospitalDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "India",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setApiError(null);

      const formData = new FormData();
      // Append text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Append file
      if (file) {
        formData.append("hospital_logo", file);
      }

      await hospitalService.createHospital(formData);
      toast.success("Hospital created successfully.");
      setOpen(false);
      reset();
      setFile(null);
      setApiError(null);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      const errorMessage = getApiErrorMessage(error, "Failed to create hospital.");
      setApiError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setFile(null);
      setApiError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Hospital
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[95vw] max-w-[95vw] sm:max-w-[720px] max-h-[85vh] overflow-hidden p-0 flex flex-col rounded-[14px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">Add New Hospital</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Fill out the details below to register a new hospital.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <form id="add-hospital-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
              <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}
            {/* Hospital Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Hospital Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Hospital Name</FieldLabel>
                  <Input {...register("hospital_name")} placeholder="Fatima Hospital" className="h-11 rounded-lg border-border bg-background" />
                  {errors.hospital_name && <FieldError>{errors.hospital_name.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Hospital Code</FieldLabel>
                  <Input {...register("hospital_code")} placeholder="NAV12" className="h-11 rounded-lg border-border bg-background font-mono" />
                  {errors.hospital_code && <FieldError>{errors.hospital_code.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Registration Number</FieldLabel>
                  <Input {...register("registration_number")} placeholder="123ERW" className="h-11 rounded-lg border-border bg-background" />
                  {errors.registration_number && <FieldError>{errors.registration_number.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Hospital Email</FieldLabel>
                  <Input type="email" {...register("email")} placeholder="hospital@example.com" className="h-11 rounded-lg border-border bg-background" />
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Phone</FieldLabel>
                  <Input {...register("phone")} placeholder="1234567890" className="h-11 rounded-lg border-border bg-background" />
                  {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Website</FieldLabel>
                  <Input {...register("website")} placeholder="https://..." className="h-11 rounded-lg border-border bg-background" />
                </Field>
              </div>

              {/* Logo Upload */}
              <Field className="gap-1.5">
                <FieldLabel className="text-xs font-semibold text-foreground">Hospital Logo</FieldLabel>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="logo-upload"
                    className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-muted-foreground hover:bg-muted/50"
                  >
                    <ImagePlus className="mr-2 h-4 w-4 text-primary" />
                    {file ? file.name : "Select Image"}
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </Field>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Location</h3>
              <Field className="gap-1.5">
                <FieldLabel className="text-xs font-semibold text-foreground">Address</FieldLabel>
                <Input {...register("address")} placeholder="123 Main St" className="h-11 rounded-lg border-border bg-background" />
                {errors.address && <FieldError>{errors.address.message}</FieldError>}
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">City</FieldLabel>
                  <Input {...register("city")} placeholder="Gorakhpur" className="h-11 rounded-lg border-border bg-background" />
                  {errors.city && <FieldError>{errors.city.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">State</FieldLabel>
                  <Input {...register("state")} placeholder="Uttar Pradesh" className="h-11 rounded-lg border-border bg-background" />
                  {errors.state && <FieldError>{errors.state.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Country</FieldLabel>
                  <Input {...register("country")} placeholder="India" className="h-11 rounded-lg border-border bg-background" />
                  {errors.country && <FieldError>{errors.country.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Pincode</FieldLabel>
                  <Input {...register("pincode")} placeholder="274802" className="h-11 rounded-lg border-border bg-background" />
                  {errors.pincode && <FieldError>{errors.pincode.message}</FieldError>}
                </Field>
              </div>
            </div>

            {/* Admin Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Admin Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Admin Name</FieldLabel>
                  <Input {...register("admin_name")} placeholder="John Doe" className="h-11 rounded-lg border-border bg-background" />
                  {errors.admin_name && <FieldError>{errors.admin_name.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Admin Email</FieldLabel>
                  <Input type="email" {...register("admin_email")} placeholder="admin@example.com" className="h-11 rounded-lg border-border bg-background" />
                  {errors.admin_email && <FieldError>{errors.admin_email.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Admin Mobile</FieldLabel>
                  <Input {...register("admin_mobile")} placeholder="9876543210" className="h-11 rounded-lg border-border bg-background" />
                  {errors.admin_mobile && <FieldError>{errors.admin_mobile.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel className="text-xs font-semibold text-foreground">Admin Password</FieldLabel>
                  <Input type="password" {...register("admin_password")} placeholder="••••••••" className="h-11 rounded-lg border-border bg-background" />
                  {errors.admin_password && <FieldError>{errors.admin_password.message}</FieldError>}
                </Field>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 pt-0">
          <DialogFooter>
            <Button variant="outline" className="h-11 rounded-full border-border px-5 text-xs font-semibold text-foreground hover:bg-muted" onClick={() => handleOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" form="add-hospital-form" className="h-11 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90" disabled={loading}>
              {loading ? "Saving..." : "Save Hospital"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
