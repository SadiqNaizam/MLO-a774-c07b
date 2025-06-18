import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, ExternalLink } from 'lucide-react';

interface ExternalLinkItem {
  label: string;
  url: string;
  icon?: React.ElementType; // Optional custom icon
}

interface ArtistBioDisplayProps {
  artistName: string;
  profilePictureUrl?: string; // Optional, will use fallback
  biography: string;
  externalLinks?: ExternalLinkItem[];
}

const ArtistBioDisplay: React.FC<ArtistBioDisplayProps> = ({
  artistName,
  profilePictureUrl,
  biography,
  externalLinks = [],
}) => {
  console.log('ArtistBioDisplay loaded for:', artistName);

  // Fallback initials for Avatar
  const getInitials = (name: string) => {
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="flex flex-col items-center p-6 sm:flex-row sm:items-start sm:space-x-6">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary/20">
          <AvatarImage src={profilePictureUrl} alt={`${artistName}'s profile`} />
          <AvatarFallback>{getInitials(artistName)}</AvatarFallback>
        </Avatar>
        <div className="mt-4 text-center sm:mt-0 sm:text-left">
          <CardTitle className="text-3xl font-bold">{artistName}</CardTitle>
          <CardDescription className="text-md text-muted-foreground mt-1">Artist</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <h3 className="text-xl font-semibold mb-2">Biography</h3>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {biography || "No biography provided."}
        </p>
      </CardContent>

      {externalLinks && externalLinks.length > 0 && (
        <CardFooter className="p-6 pt-4 border-t">
          <div className="w-full">
            <h4 className="text-lg font-semibold mb-3">Connect with {artistName}:</h4>
            <div className="flex flex-wrap gap-3">
              {externalLinks.map((link, index) => {
                const IconComponent = link.icon || ExternalLink;
                return (
                  <Button key={index} variant="outline" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <IconComponent className="mr-2 h-4 w-4" />
                      {link.label}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ArtistBioDisplay;