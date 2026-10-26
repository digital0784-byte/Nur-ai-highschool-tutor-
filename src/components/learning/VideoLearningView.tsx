import React, { useState } from 'react';
import { PlaySquare, Play, Sparkles, Clock, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VideoLearningView: React.FC = () => {
  const { selectedGrade } = useAuth();

  const videos = [
    {
      id: 'v1',
      title: 'Kinematics: 2D Projectile Motion and Parabolic Trajectory',
      subject: 'Physics',
      unit: 'Unit 2',
      duration: '18:45 min',
      ethiopianContext: 'Traditional Ethiopian Gena (ገና) mechanics and projectile launch arcs.',
    },
    {
      id: 'v2',
      title: 'Electromagnetic Induction at the Grand Ethiopian Renaissance Dam (GERD)',
      subject: 'Physics',
      unit: 'Unit 2 (Grade 12)',
      duration: '22:10 min',
      ethiopianContext: 'Turbine rotation and high-voltage transmission lines across regional grids.',
    },
    {
      id: 'v3',
      title: 'Thermodynamics of Traditional Injera Mitad Heat Conduction',
      subject: 'Physics',
      unit: 'Unit 1 (Grade 12)',
      duration: '15:30 min',
      ethiopianContext: 'Thermal conductivity of clay plate vs electrical coil heating dynamics.',
    },
  ];

  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs text-indigo-400 font-bold block mb-1">
          Category 1: ምስላዊ ትምህርት (HD Visual Learning & 2D/3D Animations)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {selectedGrade} Animated Concept Lessons
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          High-definition visual explanations grounded in real-world Ethiopian engineering and scientific phenomena.
        </p>
      </div>

      {/* Video Player Display */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden aspect-video flex flex-col items-center justify-center p-6 text-center shadow-2xl">
        {!isPlaying ? (
          <div className="space-y-4 max-w-md">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 rounded-3xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-900/40 transition hover:scale-105"
            >
              <Play className="w-8 h-8 fill-white ml-1" />
            </button>
            <h3 className="text-base sm:text-lg font-bold text-white">{activeVideo.title}</h3>
            <p className="text-xs text-slate-400">{activeVideo.ethiopianContext}</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3 bg-black">
            <span className="text-xs font-mono text-indigo-400 animate-pulse">
              ● HD Streaming: {activeVideo.title}
            </span>
            <div className="text-slate-400 text-xs">
              Interactive video simulation rendered with 60 FPS physics canvas.
            </div>
          </div>
        )}
      </div>

      {/* Video Playlist */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Video Playlist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div
              key={v.id}
              onClick={() => {
                setActiveVideo(v);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                activeVideo.id === v.id
                  ? 'bg-indigo-500/10 border-indigo-500 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{v.subject}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  {v.duration}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-2">{v.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoLearningView;
