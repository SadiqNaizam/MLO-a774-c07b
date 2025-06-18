import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import ArtistBioDisplay from '@/components/ArtistBioDisplay';
import ArtworkCard from '@/components/ArtworkCard';

// shadcn/ui Components
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; // Avatar is used within ArtistBioDisplay, but listed in layout_info.
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons (if needed, ArtistBioDisplay might use some)
import { Home, GalleryVertical, PlusSquare, UserCircle } from 'lucide-react';

// Placeholder data
const artistData = {
  name: "Elena Vortex",
  profilePictureUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=200&q=80", // Placeholder image
  biography: "Elena Vortex is a contemporary visual artist known for her abstract explorations of nature and emotion. Her work often features bold colors and dynamic compositions, inviting viewers into a world of introspection and wonder. She has exhibited in several galleries and continues to push the boundaries of her medium, seeking to evoke deep connections through her visual language.",
  externalLinks: [
    { label: "Personal Website", url: "https://example.com/elenavortex" },
    { label: "Instagram", url: "https://instagram.com/elenavortex_art" },
  ],
  statement: "My art is a journey into the unseen, a dialogue between the chaotic beauty of the natural world and the structured depths of human feeling. I strive to create pieces that are not just observed, but experienced, hoping to stir something profound within the viewer."
};

const artworksData = [
  { 
    id: "ev001", 
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBsYW5kc2NhcGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", 
    title: "Cosmic Flow", 
    artistName: artistData.name, 
    artistId: "elena-vortex" // Example artist ID
  },
  { 
    id: "ev002", 
    imageUrl: "https://images.unsplash.com/photo-1536000953601-95687398aff1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWJzdHJhY3QlMjB2aWJyYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    title: "Ephemeral Dreams", 
    artistName: artistData.name, 
    artistId: "elena-vortex" 
  },
  { 
    id: "ev003", 
    imageUrl: "https://images.unsplash.com/photo-1502600211301-3డ99182b97cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YWJzdHJhY3QlMjBuYXR1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", 
    title: "Silent Echoes", 
    artistName: artistData.name, 
    artistId: "elena-vortex"
  },
  { 
    id: "ev004", 
    imageUrl: "https://images.unsplash.com/photo-1519751138003-eb592b2a0c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFic3RyYWN0JTIgbWluaW1hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    title: "Chromatic Pulse", 
    artistName: artistData.name, 
    artistId: "elena-vortex"
  },
];

const ArtistProfilePage: React.FC = () => {
  console.log('ArtistProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-stone-200 dark:from-neutral-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <NavigationMenu className="py-2 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-primary dark:text-sky-400">
              e-gallery
            </Link>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="h-4 w-4 mr-1" /> Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/gallery">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <GalleryVertical className="h-4 w-4 mr-1" /> Gallery
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/submit-work">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <PlusSquare className="h-4 w-4 mr-1" /> Submit Art
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* Assuming this page is an example artist, link to a generic profile or login */}
              <NavigationMenuItem>
                <Link to="/artist-profile"> {/* Could be current page or a list of artists if IDs are dynamic */}
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <UserCircle className="h-4 w-4 mr-1" /> My Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8 md:py-12">
          {/* Artist Bio Section */}
          <section className="mb-10 md:mb-16">
            <ArtistBioDisplay
              artistName={artistData.name}
              profilePictureUrl={artistData.profilePictureUrl}
              biography={artistData.biography}
              externalLinks={artistData.externalLinks}
            />
          </section>

          {/* Artworks and Other Info Section using Tabs */}
          <section>
            <Tabs defaultValue="artworks" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 gap-2 max-w-lg mx-auto mb-8 bg-gray-200 dark:bg-neutral-700 p-1 rounded-lg">
                <TabsTrigger value="artworks" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:text-sky-300">
                  Artworks ({artworksData.length})
                </TabsTrigger>
                <TabsTrigger value="statement" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:text-sky-300">
                  Artist Statement
                </TabsTrigger>
                 <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:text-sky-300">
                  Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="artworks" className="mt-6">
                {artworksData.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {artworksData.map((artwork) => (
                      <ArtworkCard
                        key={artwork.id}
                        imageUrl={artwork.imageUrl}
                        title={artwork.title}
                        artistName={artwork.artistName}
                        artworkId={artwork.id}
                        artistId={artwork.artistId}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-12 bg-gray-50 dark:bg-neutral-800">
                    <CardContent>
                      <p className="text-muted-foreground">This artist has not submitted any artworks yet.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="statement" className="mt-6">
                <Card className="shadow-lg bg-white dark:bg-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary dark:text-sky-400">Artist Statement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {artistData.statement || "No artist statement provided."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                 <Card className="shadow-lg bg-white dark:bg-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary dark:text-sky-400">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      For inquiries, please reach out via the artist's external links or contact the gallery administration.
                    </p>
                    {/* Placeholder for a contact form or direct contact details if available */}
                    <div className="mt-4">
                        <p className="font-semibold">Email:</p>
                        <a href={`mailto:${artistData.name.toLowerCase().replace(' ', '.')}@example.com`} className="text-primary hover:underline dark:text-sky-400">
                            {artistData.name.toLowerCase().replace(' ', '.')}@example.com (Example)
                        </a>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </ScrollArea>

      {/* Footer */}
      <footer className="bg-neutral-800 dark:bg-black text-neutral-300 dark:text-neutral-400 text-center p-6 mt-auto">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} e-gallery. All rights reserved.</p>
          <p className="text-sm mt-1">
            Discover and appreciate visual art.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ArtistProfilePage;