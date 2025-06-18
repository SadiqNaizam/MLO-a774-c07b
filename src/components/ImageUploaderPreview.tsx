import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, XCircle, FileImage } from 'lucide-react';
import { toast } from "sonner";

interface ImageUploaderPreviewProps {
  onFileSelect: (file: File | null) => void;
  maxFileSizeMB?: number;
  allowedFileTypes?: string[];
  initialPreviewUrl?: string | null;
}

const ImageUploaderPreview: React.FC<ImageUploaderPreviewProps> = ({
  onFileSelect,
  maxFileSizeMB = 5,
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  initialPreviewUrl = null,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('ImageUploaderPreview loaded');

  useEffect(() => {
    // Clean up object URL to prevent memory leaks
    return () => {
      if (previewUrl && !initialPreviewUrl) { // Only revoke if it's a blob URL we created
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, initialPreviewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null); // Clear previous errors

    if (file) {
      // Validate file type
      if (!allowedFileTypes.includes(file.type)) {
        const typeError = `Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`;
        setError(typeError);
        toast.error(typeError);
        setSelectedFile(null);
        setPreviewUrl(initialPreviewUrl); // Reset to initial or null
        onFileSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the input
        return;
      }

      // Validate file size
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > maxFileSizeMB) {
        const sizeError = `File is too large. Max size: ${maxFileSizeMB}MB.`;
        setError(sizeError);
        toast.error(sizeError);
        setSelectedFile(null);
        setPreviewUrl(initialPreviewUrl); // Reset to initial or null
        onFileSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the input
        return;
      }

      setSelectedFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      if (previewUrl && !initialPreviewUrl) URL.revokeObjectURL(previewUrl); // Revoke previous if it exists and wasn't initial
      setPreviewUrl(newPreviewUrl);
      onFileSelect(file);
    } else {
      // No file selected or selection cancelled
      if (selectedFile && previewUrl && !initialPreviewUrl) URL.revokeObjectURL(previewUrl);
      setSelectedFile(null);
      setPreviewUrl(initialPreviewUrl);
      onFileSelect(null);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl && !initialPreviewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(initialPreviewUrl); // Revert to initial preview if one was provided, else null
    setError(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the actual file input
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 md:p-6 space-y-4">
        <Input
          type="file"
          accept={allowedFileTypes.join(',')}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          id="image-upload-input"
        />

        {previewUrl ? (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Image Preview:</p>
            <div className="relative group w-full max-w-md mx-auto border rounded-md overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={previewUrl}
                  alt={selectedFile?.name || "Selected image preview"}
                  className="object-contain w-full h-full"
                />
              </AspectRatio>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemoveImage}
                aria-label="Remove image"
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
            {selectedFile && (
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>File:</strong> {selectedFile.name}</p>
                <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <p><strong>Type:</strong> {selectedFile.type}</p>
              </div>
            )}
          </div>
        ) : (
          <label
            htmlFor="image-upload-input"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                {allowedFileTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} (MAX. {maxFileSizeMB}MB)
              </p>
            </div>
          </label>
        )}
        
        {!previewUrl && !selectedFile && (
             <Button onClick={triggerFileInput} variant="outline" className="w-full">
                <FileImage className="mr-2 h-4 w-4" /> Select Image
            </Button>
        )}


        {error && (
          <Badge variant="destructive" className="w-full text-center py-1.5 whitespace-normal">
            {error}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploaderPreview;