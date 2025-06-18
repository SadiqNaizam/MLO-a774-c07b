import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import ImageUploaderPreview from '@/components/ImageUploaderPreview'; // Custom component
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner'; // Using sonner as per App.tsx and user journey
import { UploadCloud, Palette, Framer, CalendarDays, Tags, Home, Images, UserCircle } from 'lucide-react';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const artworkFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000, "Description must be 1000 characters or less."),
  medium: z.string().min(2, "Medium is required."),
  dimensions: z.string().optional(),
  year: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() !== '' ? parseInt(val, 10) : undefined),
    z.number({ invalid_type_error: "Year must be a valid number." })
      .int("Year must be an integer.")
      .min(1000, "Please enter a valid year (e.g., 2023).")
      .max(new Date().getFullYear(), `Year cannot be in the future. Max ${new Date().getFullYear()}.`)
      .optional()
  ),
  tags: z.string().optional().refine(val => !val || val.split(',').every(tag => tag.trim().length > 0), {
    message: "Tags should be comma-separated words."
  }),
  imageFile: z
    .custom<File>((val) => val instanceof File, "Artwork image is required.")
    .refine((file) => file.size > 0, "Artwork image cannot be empty.")
    .refine((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024, `Max file size is ${MAX_FILE_SIZE_MB}MB.`)
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      `Only ${ALLOWED_FILE_TYPES.map(type => type.split('/')[1].toUpperCase()).join(', ')} formats are supported.`
    ),
});

type ArtworkFormValues = z.infer<typeof artworkFormSchema>;

const SubmitWorkPage = () => {
  const navigate = useNavigate();
  const form = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      medium: '',
      dimensions: '',
      year: undefined,
      tags: '',
      imageFile: undefined,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ArtworkFormValues) => {
    setIsSubmitting(true);
    console.log('Artwork submission data:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Artwork Submitted!', {
      description: `"${data.title}" has been successfully submitted for review.`,
      action: {
        label: 'View Profile',
        onClick: () => navigate('/artist-profile'),
      },
    });
    setIsSubmitting(false);
    form.reset(); 
    // Clear the file input in ImageUploaderPreview manually if needed or ensure it resets on form.reset()
    // For ImageUploaderPreview, its internal state also needs to be reset.
    // This might require a ref to ImageUploaderPreview or enhancing it to accept a reset signal.
    // For now, form.reset() handles form fields, user would need to re-select if they submit another.
    navigate('/artist-profile'); // As per user journey
  };
  
  console.log('SubmitWorkPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            e-Gallery
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" asChild><Link to="/"><Home className="mr-1 h-4 w-4 sm:mr-2" />Home</Link></Button>
            <Button variant="ghost" asChild><Link to="/gallery"><Images className="mr-1 h-4 w-4 sm:mr-2" />Gallery</Link></Button>
            <Button variant="default" asChild><Link to="/submit-work"><UploadCloud className="mr-1 h-4 w-4 sm:mr-2" />Submit Art</Link></Button>
            <Button variant="outline" asChild><Link to="/artist-profile"><UserCircle className="mr-1 h-4 w-4 sm:mr-2" />Profile</Link></Button>
          </div>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <UploadCloud className="mr-3 h-7 w-7 text-primary" />
              Submit New Artwork
            </CardTitle>
            <CardDescription>
              Fill in the details below to add your artwork to the gallery.
              Fields marked with <span className="text-red-500">*</span> are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sunset Over the Mountains" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description of your artwork, its inspiration, etc. (max 1000 characters)"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="imageFile"
                    render={({ field }) => ( /* field is not directly used by ImageUploaderPreview but react-hook-form tracks it */
                        <FormItem>
                        <FormLabel>Artwork Image <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <ImageUploaderPreview
                            onFileSelect={(file) => {
                                form.setValue('imageFile', file as File, { shouldValidate: true, shouldDirty: true });
                            }}
                            maxFileSizeMB={MAX_FILE_SIZE_MB}
                            allowedFileTypes={ALLOWED_FILE_TYPES}
                            />
                        </FormControl>
                        <FormDescription>
                            Upload a high-quality image of your artwork. Max {MAX_FILE_SIZE_MB}MB. Accepted: JPG, PNG, GIF, WEBP.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="medium"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Medium <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a medium" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Oil Painting">Oil Painting</SelectItem>
                                <SelectItem value="Acrylic Painting">Acrylic Painting</SelectItem>
                                <SelectItem value="Watercolor">Watercolor</SelectItem>
                                <SelectItem value="Digital Art">Digital Art</SelectItem>
                                <SelectItem value="Photography">Photography</SelectItem>
                                <SelectItem value="Sculpture">Sculpture</SelectItem>
                                <SelectItem value="Drawing">Drawing (Pencil, Charcoal, etc.)</SelectItem>
                                <SelectItem value="Mixed Media">Mixed Media</SelectItem>
                                <SelectItem value="Other">Other (Specify in description if needed)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Year Created</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder={`e.g., ${new Date().getFullYear()}`} {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 24x36 inches or 60x90 cm" {...field} />
                      </FormControl>
                      <FormDescription>Include units like inches, cm, pixels.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., abstract, nature, portrait" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated keywords to help categorize your art.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || !form.formState.isValid && form.formState.isSubmitted}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                     <UploadCloud className="mr-2 h-5 w-5" /> Submit Artwork
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-100 border-t mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} e-Gallery. All rights reserved.</p>
          <p className="mt-1">Showcasing creativity, one artwork at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default SubmitWorkPage;