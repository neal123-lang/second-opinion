"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { doctorService } from "@/lib/services/doctor-service";
import { type Language, masterService, type Speciality } from "@/lib/services/master-service";

const formSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  gender: z.string().min(1, "Gender is required"),
  registration_number: z.string().min(1, "Registration number is required"),
  qualification: z.string().min(1, "Qualification is required"),
  experience_years: z.coerce.number().min(0, "Experience must be 0 or more"),
  consultation_fee: z.coerce.number().min(0, "Fee must be 0 or more"),
  biography: z.string().optional(),
  speciality_ids: z.array(z.string()).min(1, "Select at least one speciality"),
  language_ids: z.array(z.string()).min(1, "Select at least one language"),
});

type FormValues = z.infer<typeof formSchema>;

export function AddDoctorDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    if (open) {
      masterService.getSpecialities().then(setSpecialities).catch(console.error);
      masterService.getLanguages().then(setLanguages).catch(console.error);
    }
  }, [open]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience_years: 0,
      consultation_fee: 0,
      speciality_ids: [],
      language_ids: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // Join array to string for multipart
            formData.append(key, value.join(","));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      if (file) {
        formData.append("profile_photo", file);
      }

      await doctorService.createDoctor(formData);
      toast.success("Doctor created successfully.");
      setOpen(false);
      reset();
      setFile(null);
      // Mock reload
      // window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create doctor.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[95vw] max-w-[95vw] sm:max-w-[800px] max-h-[85vh] overflow-hidden p-0 flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
            <DialogDescription>Fill out the details below to register a new doctor in the hospital.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <form id="add-doctor-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium tracking-tight">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field className="gap-1.5">
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...register("full_name")} placeholder="Dr. John Doe" />
                  {errors.full_name && <FieldError>{errors.full_name.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" {...register("email")} placeholder="doctor@example.com" />
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel>Phone</FieldLabel>
                  <Input {...register("phone")} placeholder="9876543210" />
                  {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" {...register("password")} placeholder="••••••••" />
                  {errors.password && <FieldError>{errors.password.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel>Gender</FieldLabel>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && <FieldError>{errors.gender.message}</FieldError>}
                </Field>

                <Field className="gap-1.5 md:col-span-1">
                  <FieldLabel>Profile Photo</FieldLabel>
                  <label
                    htmlFor="logo-upload"
                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background hover:bg-muted/50"
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
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
                </Field>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium tracking-tight">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field className="gap-1.5">
                  <FieldLabel>Registration Number</FieldLabel>
                  <Input {...register("registration_number")} placeholder="REG12345" />
                  {errors.registration_number && <FieldError>{errors.registration_number.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel>Qualification</FieldLabel>
                  <Input {...register("qualification")} placeholder="MBBS, MD" />
                  {errors.qualification && <FieldError>{errors.qualification.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel>Experience (Years)</FieldLabel>
                  <Input type="number" {...register("experience_years")} placeholder="5" />
                  {errors.experience_years && <FieldError>{errors.experience_years.message}</FieldError>}
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel>Consultation Fee</FieldLabel>
                  <Input type="number" {...register("consultation_fee")} placeholder="500" />
                  {errors.consultation_fee && <FieldError>{errors.consultation_fee.message}</FieldError>}
                </Field>

                {/* Multi Select for Specialities */}
                <Field className="gap-1.5">
                  <FieldLabel>Specialities</FieldLabel>
                  <Controller
                    control={control}
                    name="speciality_ids"
                    render={({ field }) => {
                      const selectedValues = field.value || [];
                      const options = specialities.map((s) => ({
                        label: s.name,
                        value: s.id,
                      }));

                      return (
                        <MultiSelect
                          options={options}
                          selected={selectedValues}
                          onChange={field.onChange}
                          placeholder="Select Specialities..."
                        />
                      );
                    }}
                  />
                  {errors.speciality_ids && <FieldError>{errors.speciality_ids.message}</FieldError>}
                </Field>

                {/* Multi Select for Languages */}
                <Field className="gap-1.5">
                  <FieldLabel>Languages</FieldLabel>
                  <Controller
                    control={control}
                    name="language_ids"
                    render={({ field }) => {
                      const selectedValues = field.value || [];
                      const options = languages.map((l) => ({
                        label: l.name,
                        value: l.id,
                      }));

                      return (
                        <MultiSelect
                          options={options}
                          selected={selectedValues}
                          onChange={field.onChange}
                          placeholder="Select Languages..."
                        />
                      );
                    }}
                  />
                  {errors.language_ids && <FieldError>{errors.language_ids.message}</FieldError>}
                </Field>

                <Field className="gap-1.5 md:col-span-2">
                  <FieldLabel>Biography</FieldLabel>
                  <Textarea {...register("biography")} placeholder="Short bio..." className="min-h-[80px]" />
                  {errors.biography && <FieldError>{errors.biography.message}</FieldError>}
                </Field>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 pt-0">
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" form="add-doctor-form" disabled={loading}>
              {loading ? "Saving..." : "Save Doctor"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
