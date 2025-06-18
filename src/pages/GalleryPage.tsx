import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtworkCard from '@/components/ArtworkCard'; // Custom component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Aperture, Search, Palette, ArrowUpDown, ListFilter } from 'lucide-react';

// Define a type for artwork data
interface Artwork {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  artistId: string;
  medium: string;
  dateAdded: string; // ISO date string for sorting
  price?: number; // Optional
}

// Placeholder artworks
const placeholderArtworks: Artwork[] = [
  { id: '1', imageUrl: 'https://source.unsplash.com/random/400x300?art,abstract&sig=1', title: 'Celestial Dreams', artistName: 'Elena Vortex', artistId: 'artist1', medium: 'Painting', dateAdded: '2024-07-15T10:00:00Z', price: 1200 },
  { id: '2', imageUrl: 'https://source.unsplash.com/random/400x300?art,sculpture&sig=2', title: 'Bronze Titan', artistName: 'Marcus Stone', artistId: 'artist2', medium: 'Sculpture', dateAdded: '2024-07-10T14:30:00Z', price: 3500 },
  { id: '3', imageUrl: 'https://source.unsplash.com/random/400x300?art,photography&sig=3', title: 'Urban Canvas', artistName: 'Sophia Lens', artistId: 'artist3', medium: 'Photography', dateAdded: '2024-08-01T09:00:00Z', price: 450 },
  { id: '4', imageUrl: 'https://source.unsplash.com/random/400x300?art,digital&sig=4', title: 'Neon Grid', artistName: 'Alex Pixel', artistId: 'artist4', medium: 'Digital Art', dateAdded: '2024-06-20T11:00:00Z', price: 800 },
  { id: '5', imageUrl: 'https://source.unsplash.com/random/400x300?art,impressionism&sig=5', title: 'Lily Pond Reflections', artistName: 'Claude Monet Jr.', artistId: 'artist5', medium: 'Painting', dateAdded: '2024-05-25T16:00:00Z', price: 2500 },
  { id: '6', imageUrl: 'https://source.unsplash.com/random/400x300?art,modern&sig=6', title: 'Chromatic Flow', artistName: 'Elena Vortex', artistId: 'artist1', medium: 'Painting', dateAdded: '2024-08-05T12:00:00Z', price: 950 },
  { id: '7', imageUrl: 'https://source.unsplash.com/random/400x300?art,portrait&sig=7', title: 'The Watcher', artistName: 'Marcus Stone', artistId: 'artist2', medium: 'Photography', dateAdded: '2024-07-22T18:00:00Z', price: 600 },
  { id: '8', imageUrl: 'https://source.unsplash.com/random/400x300?art,surreal&sig=8', title: 'Floating Islands', artistName: 'Alex Pixel', artistId: 'artist4', medium: 'Digital Art', dateAdded: '2024-07-01T08:00:00Z', price: 1100 },
  { id: '9', imageUrl: 'https://source.unsplash.com/random/400x300?art,street&sig=9', title: 'Graffiti Symphony', artistName: 'Sophia Lens', artistId: 'artist3', medium: 'Photography', dateAdded: '2023-11-10T10:00:00Z', price: 300 },
  { id: '10', imageUrl: 'https://source.unsplash.com/random/400x300?art,nature&sig=10', title: 'Forest Whisper', artistName: 'Willow Green', artistId: 'artist6', medium: 'Painting', dateAdded: '2024-08-10T11:00:00Z', price: 750 },
  { id: '11', imageUrl: 'https://source.unsplash.com/random/400x300?art,abstract,minimalist&sig=11', title: 'Geometric Harmony', artistName: 'Elena Vortex', artistId: 'artist1', medium: 'Digital Art', dateAdded: '2024-04-12T13:00:00Z', price: 1500 },
  { id: '12', imageUrl: 'https://source.unsplash.com/random/400x300?art,ceramic&sig=12', title: 'Earthen Vase', artistName: 'Marcus Stone', artistId: 'artist2', medium: 'Sculpture', dateAdded: '2024-03-19T17:00:00Z', price: 900 },
];

const ITEMS_PER_PAGE = 8;

// Simple Header Component
const PageHeader = () => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
        <Aperture className="h-7 w-7" />
        <span>E-Gallery</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/gallery">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Gallery</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/submit-work">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Submit Work</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/artist-profile"> {/* Generic link as per App.tsx */}
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Artist Profile</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </header>
);

// Simple Footer Component
const PageFooter = () => (
  <footer className="bg-gray-100 border-t mt-auto">
    <div className="container mx-auto px-4 md:px-6 py-6 text-center text-gray-600">
      <p>&copy; {new Date().getFullYear()} E-Gallery. All rights reserved.</p>
      <p className="text-sm">Discover and Showcase Art</p>
    </div>
  </footer>
);


const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('all');
  const [sortOrder, setSortOrder] = useState('date_desc'); // e.g., 'date_desc', 'date_asc', 'title_asc', 'title_desc'
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('GalleryPage loaded');
    window.scrollTo(0, 0); // Scroll to top on page load or filter change
  }, []);

  const uniqueMediums = useMemo(() => {
    const mediums = new Set(placeholderArtworks.map(art => art.medium));
    return ['all', ...Array.from(mediums)];
  }, []);

  const filteredAndSortedArtworks = useMemo(() => {
    let artworks = [...placeholderArtworks];

    // Filter by search term (title or artist name)
    if (searchTerm) {
      artworks = artworks.filter(art =>
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.artistName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by medium
    if (selectedMedium !== 'all') {
      artworks = artworks.filter(art => art.medium === selectedMedium);
    }

    // Sort
    switch (sortOrder) {
      case 'date_desc':
        artworks.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'date_asc':
        artworks.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        break;
      case 'title_asc':
        artworks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        artworks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'artist_asc':
        artworks.sort((a, b) => a.artistName.localeCompare(b.artistName));
        break;
      case 'artist_desc':
        artworks.sort((a, b) => b.artistName.localeCompare(a.artistName));
        break;
    }
    return artworks;
  }, [searchTerm, selectedMedium, sortOrder]);

  const paginatedArtworks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedArtworks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedArtworks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedArtworks.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };
  
  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMedium, sortOrder]);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageHeader />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <section aria-labelledby="gallery-title" className="mb-8">
          <h1 id="gallery-title" className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            Art Gallery
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Explore our curated collection of fine arts.
          </p>
        </section>

        {/* Filters and Sort Section */}
        <section aria-labelledby="filter-sort-heading" className="mb-8 p-4 bg-white rounded-lg shadow">
            <h2 id="filter-sort-heading" className="sr-only">Filter and Sort Artworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="relative">
                    <label htmlFor="search-artwork" className="block text-sm font-medium text-gray-700 mb-1">
                        Search Artworks
                    </label>
                    <Input
                        id="search-artwork"
                        type="text"
                        placeholder="Search by title or artist..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-3" />
                </div>
                <div>
                    <label htmlFor="filter-medium" className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Medium
                    </label>
                    <Select value={selectedMedium} onValueChange={setSelectedMedium}>
                        <SelectTrigger id="filter-medium" className="w-full">
                             <ListFilter className="h-4 w-4 mr-2 text-gray-500" />
                            <SelectValue placeholder="Select medium" />
                        </SelectTrigger>
                        <SelectContent>
                        {uniqueMediums.map(medium => (
                            <SelectItem key={medium} value={medium}>
                            {medium === 'all' ? 'All Mediums' : medium}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">
                        Sort by
                    </label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger id="sort-order" className="w-full">
                            <ArrowUpDown className="h-4 w-4 mr-2 text-gray-500" />
                            <SelectValue placeholder="Sort order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date_desc">Newest First</SelectItem>
                            <SelectItem value="date_asc">Oldest First</SelectItem>
                            <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                            <SelectItem value="title_desc">Title (Z-A)</SelectItem>
                            <SelectItem value="artist_asc">Artist (A-Z)</SelectItem>
                            <SelectItem value="artist_desc">Artist (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>

        {/* Artworks Grid Section */}
        <section aria-labelledby="artworks-grid-heading">
            <h2 id="artworks-grid-heading" className="sr-only">Artworks Collection</h2>
            {paginatedArtworks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedArtworks.map(artwork => (
                    <ArtworkCard
                    key={artwork.id}
                    imageUrl={artwork.imageUrl}
                    title={artwork.title}
                    artistName={artwork.artistName}
                    artworkId={artwork.id} // Link to specific artwork
                    artistId={artwork.artistId} // Link to specific artist
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Palette className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-xl text-gray-600">No artworks found matching your criteria.</p>
                    <p className="text-sm text-gray-500">Try adjusting your filters or search term.</p>
                </div>
            )}
        </section>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <section aria-label="Artwork pagination" className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(index + 1); }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>
      <PageFooter />
    </div>
  );
};

export default GalleryPage;