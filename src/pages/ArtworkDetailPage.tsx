import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home as HomeIcon } from 'lucide-react';

interface ArtworkData {
  id: string;
  title: string;
  artistName: string;
  artistId: string;
  imageUrl: string;
  description: string;
  medium: string;
  dimensions: string;
  year: string;
  tags?: string[];
}

// Sample data - in a real app, this would come from an API
const sampleArtworks: Record<string, ArtworkData> = {
  '1': {
    id: '1',
    title: 'Celestial Dreams',
    artistName: 'Aurora Chen',
    artistId: 'aurora001',
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJzdHJhY3QlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'An ethereal abstract piece that captures the boundless beauty of the cosmos. Swirls of cosmic dust and distant nebulae invite the viewer on a journey through imagination.',
    medium: 'Oil on Linen',
    dimensions: '120cm x 90cm',
    year: '2023',
    tags: ['Abstract', 'Cosmic', 'Ethereal', 'Painting'],
  },
  '2': {
    id: '2',
    title: 'Urban Rhapsody',
    artistName: 'Leo Maxwell',
    artistId: 'leoM02',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmVldCUyMGFydCUyMHBhaW50aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80',
    description: 'A dynamic portrayal of city life, filled with vibrant colors and energetic strokes that convey the constant motion and underlying harmony of the urban environment.',
    medium: 'Acrylic & Spray Paint on Canvas',
    dimensions: '150cm x 100cm',
    year: '2022',
    tags: ['Urban', 'Street Art', 'Contemporary', 'Vibrant'],
  },
};

const defaultArtwork: ArtworkData = {
  id: '0',
  title: 'Artwork Not Found',
  artistName: 'N/A',
  artistId: 'N/A',
  imageUrl: 'https://via.placeholder.com/1200x900/e0e0e0/969696?text=Artwork+Not+Available',
  description: 'The artwork you are looking for does not exist or is currently unavailable. Please try another artwork or browse our gallery.',
  medium: 'N/A',
  dimensions: 'N/A',
  year: 'N/A',
};

const ArtworkDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const artworkId = searchParams.get('artworkId');
  const [artwork, setArtwork] = useState<ArtworkData>(defaultArtwork);

  useEffect(() => {
    console.log('ArtworkDetailPage loaded');
    if (artworkId && sampleArtworks[artworkId]) {
      setArtwork(sampleArtworks[artworkId]);
    } else if (artworkId) { // ID provided but not in sample data
      setArtwork({ ...defaultArtwork, title: `Artwork ID '${artworkId}' Not Found` });
    } else {
      // Fallback to the first sample artwork if no ID is provided, or a specific default
      setArtwork(sampleArtworks['1'] || defaultArtwork);
    }
  }, [artworkId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Placeholder */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            e-Gallery
          </Link>
          <nav className="space-x-3 sm:space-x-4">
            <Link to="/gallery" className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
              Gallery
            </Link>
            <Link to="/submit-work" className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
              Submit Art
            </Link>
            <Link to="/artist-profile" className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base">
              My Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb className="mb-6 sm:mb-8 py-2 px-3 sm:px-4 bg-gray-100 rounded-md shadow-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors">
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/gallery" className="text-gray-600 hover:text-primary transition-colors">Gallery</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-gray-800 truncate max-w-[150px] sm:max-w-xs">
                {artwork.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-5 gap-6 lg:gap-10">
          {/* Artwork Image Section */}
          <div className="md:col-span-3">
            <Card className="overflow-hidden shadow-xl border-gray-200">
              <AspectRatio ratio={4 / 3} className="bg-slate-200">
                <img
                  src={artwork.imageUrl}
                  alt={`Artwork: ${artwork.title}`}
                  className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
                  onError={(e) => (e.currentTarget.src = defaultArtwork.imageUrl)} // Fallback for broken image links
                />
              </AspectRatio>
            </Card>
          </div>

          {/* Artwork Details Section */}
          <div className="md:col-span-2">
            <Card className="shadow-xl border-gray-200 h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
                  {artwork.title}
                </CardTitle>
                <CardDescription className="text-md text-gray-600 pt-1">
                  By{' '}
                  <Link
                    to={`/artist-profile?artistId=${artwork.artistId}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {artwork.artistName}
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm flex-grow">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Details</h3>
                  <div className="space-y-1.5">
                    <p><strong className="text-gray-600">Medium:</strong> <Badge variant="secondary">{artwork.medium}</Badge></p>
                    <p><strong className="text-gray-600">Dimensions:</strong> {artwork.dimensions}</p>
                    <p><strong className="text-gray-600">Year:</strong> {artwork.year}</p>
                  </div>
                </div>
                {artwork.tags && artwork.tags.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {artwork.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer className="bg-gray-800 text-gray-300 text-center py-8 mt-12">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} e-Gallery. All rights reserved.</p>
          <nav className="mt-2 space-x-3">
            <Link to="/gallery" className="hover:text-white hover:underline text-sm">Gallery</Link>
            <span className="text-gray-500">|</span>
            <Link to="/" className="hover:text-white hover:underline text-sm">Home</Link>
             <span className="text-gray-500">|</span>
            <Link to="/submit-work" className="hover:text-white hover:underline text-sm">Submit Art</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default ArtworkDetailPage;