import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import ArtistProfilePage from "./pages/ArtistProfilePage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import GalleryPage from "./pages/GalleryPage";
import Homepage from "./pages/Homepage";
import SubmitWorkPage from "./pages/SubmitWorkPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/artist-profile" element={<ArtistProfilePage />} />
          <Route path="/artwork-detail" element={<ArtworkDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/submit-work" element={<SubmitWorkPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
