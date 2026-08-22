"use client";

import { useState } from "react";
import { innovationStories } from "../../data/mockData";

// TODO: Fetch stories from the backend instead of using mock data
// Currently fetch from mock data as program organized by Sandip, Purnima, Prakriti

function StoryThumbnail({ story, className }) {
  if (story.thumbnail) {
    return (
      <img
        src={story.thumbnail}
        alt={`${story.project} event photo`}
        className={`${className} object-cover`}
      />
    );
  }
  return (
    <div
      className={`${className} bg-bg border border-border flex items-center justify-center`}
    >
      <span className="text-xs text-text-light">Project photo</span>
    </div>
  );
}

function StoryModal({ story, onClose }) {
  if (!story) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-btn max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <StoryThumbnail story={story} className="w-full h-56 rounded-t-btn" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-navy flex items-center justify-center shadow hover:bg-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-navy text-xl mb-1.5">{story.project}</h3>
          <p className="text-sm text-blue font-medium mb-4">{story.team}</p>

          <div className="space-y-3">
            {(Array.isArray(story.description)
              ? story.description
              : [story.description]
            ).map((para, i) => (
              <p key={i} className="text-text-light text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="container-page py-16">
      <p className="eyebrow mb-3">Innovation Stories</p>
      <h1 className="section-title mb-3">Ideas built by ambassadors</h1>
      <p className="text-text-light mb-10 max-w-2xl">
        Projects and initiatives published by NIC administrators to showcase student-led
        innovation happening across partner campuses.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {innovationStories.map((s) => {
          const preview = Array.isArray(s.description) ? s.description[0] : s.description;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedStory(s)}
              className="card flex flex-col text-left cursor-pointer hover:shadow-md transition-shadow"
            >
              <StoryThumbnail story={s} className="w-full h-36 rounded-btn mb-4" />
              <h3 className="font-semibold text-navy mb-1.5">{s.project}</h3>
              <p className="text-sm text-blue font-medium mb-3">{s.team}</p>
              <p className="text-text-light text-sm line-clamp-3">{preview}</p>
            </button>
          );
        })}
      </div>

      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
}