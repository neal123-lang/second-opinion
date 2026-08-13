"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, FileText, Loader2, Plus, Trash2, UploadCloud, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { caseletService } from "@/lib/services/caselet-service";
import { showPatientError } from "@/lib/patient-alert";
import { getApiErrorMessage } from "@/lib/utils";

interface DocumentItem {
  id: string;
  name: string;
  file: File | null;
}

function CaseletDocumentUploadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseletId = searchParams.get("caselet_id");

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<DocumentItem[]>([{ id: "doc-1", name: "", file: null }]);

  useEffect(() => {
    if (!caseletId) {
      showPatientError("Invalid caselet session. Please start from dashboard.", "Session Expired");
      router.replace("/patient/dashboard");
    }
  }, [caseletId, router]);

  const handleAddDocument = () => {
    setDocuments((prev) => [...prev, { id: `doc-${Date.now()}-${Math.random()}`, name: "", file: null }]);
  };

  const handleRemoveDocument = (id: string) => {
    if (documents.length === 1) {
      showPatientError("At least one document slot is required");
      return;
    }
    setDocuments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNameChange = (id: string, name: string) => {
    setDocuments((prev) => prev.map((item) => (item.id === id ? { ...item, name } : item)));
  };

  const handleFilesSelected = (id: string, fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const filesArray = Array.from(fileList);

    setDocuments((prev) => {
      const targetIndex = prev.findIndex((item) => item.id === id);
      if (targetIndex === -1) return prev;

      const updated = [...prev];
      const firstFile = filesArray[0];
      const firstAutoName = updated[targetIndex].name ? updated[targetIndex].name : firstFile.name.split(".")[0];
      updated[targetIndex] = { ...updated[targetIndex], file: firstFile, name: firstAutoName };

      for (let i = 1; i < filesArray.length; i++) {
        const file = filesArray[i];
        updated.splice(targetIndex + i, 0, {
          id: `doc-${Date.now()}-${i}-${Math.random()}`,
          name: file.name.split(".")[0],
          file,
        });
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseletId) return;

    const validDocs = documents.filter((d) => d.file !== null);

    if (validDocs.length === 0) {
      // If user hasn't selected any file, allow proceeding directly to preview
      router.push(`/patient/caselet/preview?caselet_id=${caseletId}`);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      validDocs.forEach((doc) => {
        if (doc.file) {
          formData.append("files", doc.file);
          const cleanName = (doc.name || doc.file.name.split(".")[0]).replace(/,/g, " ").trim();
          formData.append("document_names", cleanName);
        }
      });

      const res = await caseletService.uploadDocuments(caseletId, formData);
      if (res.success) {
        toast.success("Documents uploaded successfully!");
        router.push(`/patient/caselet/preview?caselet_id=${caseletId}`);
      } else {
        showPatientError(res.message || "Failed to upload documents. Please try again.", "Upload Error");
      }
    } catch (error: any) {
      showPatientError(error.message || getApiErrorMessage(error, "Failed to upload documents."), "Upload Error");
    } finally {
      setLoading(false);
    }
  };

  if (!caseletId) return null;

  return (

    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans relative">
      {/* Sticky Header */}
      <header className="px-5 py-4 bg-card text-card-foreground flex items-center justify-between sticky top-0 z-20 border-b border-border">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-10 w-10 rounded-md flex items-center justify-center bg-card hover:bg-muted text-foreground transition-colors border border-border shrink-0"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={1.75} />
          </button>
          <div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold text-primary bg-primary/10 uppercase leading-none mb-1">
              Caselet Generation
            </span>
            <h1 className="text-base font-bold tracking-tight leading-none text-foreground">Upload Medical Documents</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 pb-32 max-w-md mx-auto w-full space-y-4">
        {/* Info Banner */}
        <div className="bg-card rounded-md border border-border p-4.5 flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p className="font-bold text-foreground">Attach Medical Files</p>
            <p className="text-muted-foreground mt-0.5">
              Upload diagnostic tests (e.g. RBC, MRI), prescriptions, or clinical notes for caselet synthesis.
            </p>
          </div>
        </div>

        {/* Document Form List */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={doc.id}
                className="bg-card rounded-md border border-border p-4.5 space-y-3 transition-all hover:border-primary"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Document #{index + 1}
                  </span>
                  {documents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="text-xs text-destructive hover:opacity-90 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  )}
                </div>

                {/* Document Name Input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Document Name (e.g., rbc, mri)</label>
                  <input
                    type="text"
                    placeholder="e.g. rbc, mri, blood_report"
                    value={doc.name}
                    onChange={(e) => handleNameChange(doc.id, e.target.value)}
                    className="w-full h-11 px-3.5 text-sm rounded-md bg-muted border border-border outline-none focus:bg-card focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/70"
                  />
                </div>

                {/* File Input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Select File</label>
                  <div className="relative border-2 border-dashed border-border rounded-md p-3.5 text-center bg-muted hover:bg-card hover:border-primary transition-all cursor-pointer">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        handleFilesSelected(doc.id, e.target.files);
                        e.target.value = "";
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {doc.file ? (
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary">
                        <FileText className="h-4 w-4" />
                        <span className="truncate max-w-[200px]">{doc.file.name}</span>
                        <CheckCircle2 className="h-4 w-4 text-foreground" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <UploadCloud className="h-4 w-4 text-muted-foreground" />
                        <span>Click or drag to choose file(s)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Another Document Button */}
          <button
            type="button"
            onClick={handleAddDocument}
            className="w-full h-11 rounded-md border border-dashed border-primary bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            Add Another Document
          </button>
        </form>
      </main>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 w-full p-4 bg-card border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.06)] z-20">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 rounded-md text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:bg-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Upload &amp; Continue
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function CaseletDocumentUploadPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <CaseletDocumentUploadContent />
    </Suspense>
  );
}
