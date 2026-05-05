"use client";

import { ImageGallery } from '@/components/dashboard/ImageGallery';
import PromptInput from '@/components/dashboard/PromptInput';
import { GeneratedImage } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createImage, getUserImages } from '@/lib/actions/images.actions';
import { useUser } from '@clerk/nextjs';
import ImageGridLoader from '@/components/dashboard/ImageGridLoader';
import { uploadImageToStorage } from '@/lib/supabase/client';

const DashboardPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const { user } = useUser();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchImages = async () => {
      try {
        const res = await getUserImages(user.id);
        console.log("Fetched images:", res);

        const formatted = res.map((img) => ({
          id: img.id,
          url: img.url,
          prompt: img.prompt,
          timestamp: new Date(img.createdAt),
          liked: img.liked ?? false,
        }));

        setImages(formatted);
      } catch (error) {
        console.error("FETCH IMAGES ERROR:", error);
        toast.error("Failed to fetch images");
      }finally{
        setIsFetching(false);
      }
    };

    fetchImages();
  }, [user]);

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if(!user) {
      toast.error("Please sign in to generate images");
      return;
    }

    try {
      setIsGenerating(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API ERROR:", text);
        throw new Error("Generation failed");
      }

      const blob = await res.blob();

      const file = new File([blob], `image-${Date.now()}.png`, {
        type: "image/png",
      });

      const uploadedUrl = await uploadImageToStorage(file);

      await createImage({
        url: uploadedUrl,
        prompt,
        userId: user.id,
      });

      setImages((prev) => [ { id: Date.now().toString(), url: uploadedUrl, prompt, timestamp: new Date(), liked: false, }, ...prev, ]);
    } catch (error) {
      console.error(error);
      toast.error("Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };
  const handleLike = (id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, liked: !img.liked } : img))
    );
  };

  const handleDownload = (id: string) => {
    const image = images.find((img) => img.id === id);
    if (image) {
      toast.success('Download started!');
    }
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
      <header className="p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Generate Images</h2>
          <p className="text-white/60">Create stunning AI-generated artwork with advanced models</p>
        </div>
      </header>

      <div className="flex-1 overflow-hidden p-6">
        {
          isFetching ? (
            <div className="flex flex-col gap-6">
              <ImageGridLoader />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center max-w-full h-full flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl rounded-full" />

                <div className="relative w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-white/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 17L15 12m0 0l-5.25-5M15 12H3"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                No images generated yet
              </h3>

              <p className="text-white/60 mb-6">
                Start creating stunning AI-generated artwork by typing a prompt below.
              </p>

              <div className="grid grid-cols-1 gap-2 mb-6">
                <div className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  ✨ Try: “futuristic forest with glowing trees”
                </div>
                <div className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  🌌 Try: “cyberpunk city at night, cinematic lighting”
                </div>
              </div>

              <p className="text-white/30 text-xs">
                Use the prompt bar below to generate your first image
              </p>
            </div>
          ) : (
            <ImageGallery
              images={images}
              onLike={handleLike}
              onDownload={handleDownload}
              onCopyPrompt={handleCopyPrompt}
            />
          )
        }
      </div>

      <PromptInput 
        onGenerate={handleGenerate} 
        isGenerating={isGenerating} 
      />
    </main>
  );
}

export default DashboardPage;