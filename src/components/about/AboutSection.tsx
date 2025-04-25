import React from "react";
import { Camera, Palette, Film as FilmSlate, Coffee } from "lucide-react";
import Timeline from "./Timeline";
import ToolsSection from "./ToolsSection";
import Button from "../ui/Button";

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-px bg-gradient-to-r from-pink-500 to-blue-500 w-12 mr-4"></div>
              <span className="text-gray-400 uppercase tracking-wider text-sm font-medium">
                About Me
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              I create meaningful design solutions that connect with your
              audience.
            </h2>

            <p className="text-gray-300 mb-6">
              I'm Rafim Khan, a graphic designer with 8+ years of experience
              creating impactful visual identities and digital experiences. My
              passion lies in translating complex ideas into clear, beautiful
              design that resonates with people.
            </p>

            <p className="text-gray-300 mb-10">
              Based in New York, I've collaborated with startups, established
              brands, and creative agencies to develop design solutions that are
              not only visually striking but strategically sound.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div>
                <div className="flex items-center mb-3">
                  <Camera className="text-pink-500 mr-2" size={20} />
                  <h3 className="font-semibold">Photography</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Capturing moments and creating visual stories through the
                  lens.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Palette className="text-blue-500 mr-2" size={20} />
                  <h3 className="font-semibold">Illustration</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Creating custom illustrations that add personality to brands.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <FilmSlate className="text-purple-500 mr-2" size={20} />
                  <h3 className="font-semibold">Motion</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Bringing designs to life through animation and motion
                  graphics.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Coffee className="text-yellow-500 mr-2" size={20} />
                  <h3 className="font-semibold">UI/UX</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Crafting intuitive user interfaces for seamless experiences.
                </p>
              </div>
            </div>

            <Button href="/contact">Get in Touch</Button>
          </div>

          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/rafim.jpg"
                alt="Rafim Khan"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 p-6 bg-gray-900 rounded-lg shadow-xl max-w-xs">
              <blockquote className="text-gray-300 italic mb-4">
                "Design is not just what it looks like and feels like. Design is
                how it works."
              </blockquote>
              <cite className="text-pink-500 font-medium">— Steve Jobs</cite>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">My Journey</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The path that shaped my design philosophy and approach.
            </p>
          </div>

          <Timeline />
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">My Tools</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The software and hardware I use to bring ideas to life.
            </p>
          </div>

          <ToolsSection />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
