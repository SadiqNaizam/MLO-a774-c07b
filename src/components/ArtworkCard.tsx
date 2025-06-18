import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  artistName: string;
  artworkId?: string | number; // Optional: for linking to specific artwork, e.g., /artwork-detail?id=artworkId
  artistId?: string | number;  // Optional: for linking to specific artist, e.g., /artist-profile?id=artistId
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  imageUrl,
  title,
  artistName,
  artworkId,
  artistId,
}) => {
  console.log('ArtworkCard loaded for artwork:', title, 'by artist:', artistName);

  // Construct links. If IDs are provided, append them as query parameters.
  // The base paths /artwork-detail and /artist-profile match App.tsx.
  const artworkDetailLink = artworkId
    ? `/artwork-detail?artworkId=${artworkId}`
    : '/artwork-detail';
  const artistProfileLink = artistId
    ? `/artist-profile?artistId=${artistId}`
    : '/artist-profile';

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl group flex flex-col">
      <CardHeader className="p-0 relative">
        <Link to={artworkDetailLink} aria-label={`View details for ${title}`}>
          <AspectRatio ratio={4 / 3}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x300/cccccc/969696?text=Artwork+Preview'}
              alt={`Artwork: ${title}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </Link>
      </CardHeader>

      <CardContent className="p-4 flex-grow space-y-1">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          <Link to={artworkDetailLink} className="hover:text-primary/80 transition-colors">
            {title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          By: <Link to={artistProfileLink} className="hover:text-primary/80 transition-colors hover:underline">
                 {artistName}
               </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default ArtworkCard;