import React from 'react';
import { Link } from 'react-router-dom';
import ArtworkCard from '@/components/ArtworkCard'; // Custom component
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { GalleryVerticalEnd, Palette } from 'lucide-react'; // Icon for logo/brand

// Sample data for ArtworkCards
const featuredArtworks = [
  {
    imageUrl: 'https://picsum.photos/seed/feat1/600/400',
    title: 'Ephemeral Dreams',
    artistName: 'Elena Petrova',
    artworkId: '101',
    artistId: 'artist1',
  },
  {
    imageUrl: 'https://picsum.photos/seed/feat2/600/400',
    title: 'Urban Serenity',
    artistName: 'Marcus Aurelius II',
    artworkId: '102',
    artistId: 'artist2',
  },
  {
    imageUrl: 'https://picsum.photos/seed/feat3/600/400',
    title: 'Nature\'s Canvas',
    artistName: 'Sophia Chen',
    artworkId: '103',
    artistId: 'artist3',
  },
  {
    imageUrl: 'https://picsum.photos/seed/feat4/600/400',
    title: 'Abstract Forms in Blue',
    artistName: 'Leo Gonzalez',
    artworkId: '104',
    artistId: 'artist4',
  },
];

const newAdditions = [
  {
    imageUrl: 'https://picsum.photos/seed/new1/400/300',
    title: 'Crimson Tide',
    artistName: 'Aisha Khan',
    artworkId: '201',
    artistId: 'artist5',
  },
  {
    imageUrl: 'https://picsum.photos/seed/new2/400/300',
    title: 'City Lights Aglow',
    artistName: 'David Miller',
    artworkId: '202',
    artistId: 'artist6',
  },
  {
    imageUrl: 'https://picsum.photos/seed/new3/400/300',
    title: 'Whispers of the Forest',
    artistName: 'Isabelle Moreau',
    artworkId: '203',
    artistId: 'artist7',
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2 text-lg font-semibold">
            <Palette className="h-7 w-7 text-primary" />
            <span className="text-primary">e-Gallery</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/gallery">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Gallery
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/submit-work">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Submit Art
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* Example link to a generic artist profile page or list if it exists */}
              {/* <NavigationMenuItem>
                <Link to="/artist-profile"> // Or /artists if that's a route
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Artists
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with Carousel */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-center sm:text-4xl lg:text-5xl mb-8">
              Discover Inspiring Art
            </h1>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {featuredArtworks.map((artwork, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2"> {/* Show 2 cards on medium/large screens */}
                    <div className="p-1">
                      <ArtworkCard
                        imageUrl={artwork.imageUrl}
                        title={artwork.title}
                        artistName={artwork.artistName}
                        artworkId={artwork.artworkId}
                        artistId={artwork.artistId}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12 hidden sm:flex" />
              <CarouselNext className="mr-12 hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* New Additions Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-center sm:text-3xl mb-8">
              New & Noteworthy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newAdditions.map((artwork) => (
                <ArtworkCard
                  key={artwork.artworkId}
                  imageUrl={artwork.imageUrl}
                  title={artwork.title}
                  artistName={artwork.artistName}
                  artworkId={artwork.artworkId}
                  artistId={artwork.artistId}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Button */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/gallery">
              <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore Full Gallery <GalleryVerticalEnd className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} e-Gallery. All rights reserved.
          <p className="mt-1">A platform for artists and art lovers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;