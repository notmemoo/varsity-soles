"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Instagram, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Restoration videos from the public/videos folder
const restorationVideos = [
    {
        id: 1,
        name: "Jordan 11 72-10",
        brand: "Jordan",
        service: "Full Restoration",
        video: "/videos/72-10 11s.mp4",
    },
    {
        id: 2,
        name: "Yeezy 700 Analog",
        brand: "Adidas",
        service: "Deep Cleaning",
        video: "/videos/Analog.mp4",
    },
    {
        id: 3,
        name: "Jordan 12 Cherry",
        brand: "Jordan",
        service: "Full Restoration",
        video: "/videos/Cherry12.mp4",
    },
    {
        id: 4,
        name: "Jordan 12 Flu Game",
        brand: "Jordan",
        service: "Un-Yellowing & Deep Clean",
        video: "/videos/FluGame.mp4",
    },
    {
        id: 5,
        name: "Jordan 4 White Oreo",
        brand: "Jordan",
        service: "Deep Cleaning",
        video: "/videos/White Oreo.mp4",
    },
    {
        id: 6,
        name: "Jordan 11 Win Like 82",
        brand: "Jordan",
        service: "Un-Yellowing",
        video: "/videos/WinLike82.mp4",
    },
    {
        id: 7,
        name: "Jordan 4 Dusty Cactus",
        brand: "Jordan",
        service: "Deep Cleaning",
        video: "/videos/dusty cactus.mp4",
    },
    {
        id: 8,
        name: "Yeezy 350 Israfil",
        brand: "Adidas",
        service: "Deep Cleaning",
        video: "/videos/israfil.mp4",
    },
];

// Before/After images
const beforeAfterImages = [
    {
        id: 1,
        name: "Nike Foamposite Fighter Jet",
        brand: "Nike",
        service: "Un-Yellowing",
        image: "/restorations/foamposite-fighter-jet.png",
    },
];

function VideoCard({ restoration }: { restoration: typeof restorationVideos[0] }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-charcoal hover-lift">
            <video
                ref={videoRef}
                src={restoration.video}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onEnded={() => setIsPlaying(false)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className={`w-16 h-16 rounded-full bg-varsity-red/90 flex items-center justify-center transition-all ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                    {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                    ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                    )}
                </div>
            </button>

            {/* Mute Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
                {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                )}
            </button>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <Badge className="bg-varsity-red/20 text-varsity-red border-0 mb-2">
                    {restoration.service}
                </Badge>
                <h3 className="font-semibold text-white">{restoration.name}</h3>
                <p className="text-sm text-gray-400">{restoration.brand}</p>
            </div>
        </div>
    );
}

export function RestorationsGallery() {
    return (
        <section id="restorations" className="py-20 md:py-32 bg-jet">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 border-varsity-red text-varsity-red">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Our Work
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Restoration <span className="text-gradient">Gallery</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-6">
                        Watch real transformations from our restoration shop. Every pair gets the Varsity Soles treatment.
                    </p>

                    {/* Instagram CTA */}
                    <Link
                        href="https://instagram.com/varsitysoles"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500/10">
                            <Instagram className="w-4 h-4 mr-2" />
                            Follow @varsitysoles for more
                        </Button>
                    </Link>
                </div>

                {/* Before/After Image */}
                {beforeAfterImages.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold mb-6 text-center">Before & After</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                            {beforeAfterImages.map((item) => (
                                <div key={item.id} className="relative rounded-xl overflow-hidden hover-lift max-w-md">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                        <Badge className="bg-varsity-red/20 text-varsity-red border-0 mb-2">
                                            {item.service}
                                        </Badge>
                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-400">{item.brand}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Video Grid */}
                <h3 className="text-xl font-semibold mb-6 text-center">Restoration Videos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {restorationVideos.map((restoration) => (
                        <VideoCard key={restoration.id} restoration={restoration} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        Ready to bring your kicks back to life?
                    </p>
                    <Link href="#services">
                        <Button className="bg-varsity-red hover:bg-varsity-red-dark">
                            View Our Services
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
