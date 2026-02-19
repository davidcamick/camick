import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Video, Play, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const portfolioCards = [
  {
    id: 1,
    title: "My Showreel",
    subtitle: "Cover Video - 2025",
    description: "My best work of 2024-25 compiled into one video",
    icons: [Camera, Star, Video, Play, Film],
    span: "md:col-span-2",
    link: "https://instagram.com"
  },
  {
    id: 2,
    title: "Revenge: Alabama vs Vanderbilt",
    description: "A high energy recap of the College Gameday presentation of Alabama vs Vanderbilt completely shot and edited by me in under 4 hours.",
    span: "",
    link: "https://drive.google.com/file/d/161jqiYb439pP4qnf8kUWEfzrjzxVbno6/view?usp=drive_link",
  },
  {
    id: 3,
    title: "Alabama Season Recap 2025",
    description: "A long form Recap video of the 2025 Alabama Season. Edited by Me",
    span: "",
    link: "https://google.com",
  },
  {
    id: 4,
    title: "Back To Business",
    description: "A high energy workout mixtape made for D1 college basketball player Liam Mullins",
    span: "md:col-span-2",
    link: "https://www.instagram.com/reel/C6efITwoQpR/",
  },
  {
    id: 5,
    title: "NEON",
    description: "BYX Neon party event video. Shot and Edited by me, delivered 3 hours after the end of the party",
    span: "",
    link: "https://www.instagram.com/reel/DT313FcD16W/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 6,
    title: "The Fish Bowl",
    description: "A hype video for St. Pius X vs Marist, Georgia Highschool Football's biggest rivalry",
    span: "md:col-span-2",
    link: "https://drive.google.com/file/d/1e3VIqVGylZ9uFqixnaT1X81UvzDLHOsd/view?usp=sharing",
  },
];

const Modal = ({ isOpen, onClose, card }) => {
  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 p-8 rounded-xl max-w-2xl w-full relative border border-zinc-50/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#EFF9F0]/60 hover:text-[#EFF9F0]"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-[#51BBFE] mb-4">{card.title}</h2>
            {card.subtitle && (
              <h3 className="text-xl text-[#EFF9F0] mb-4">{card.subtitle}</h3>
            )}
            <p className="text-[#EFF9F0]/80 mb-6">{card.description}</p>
            <div className="flex gap-4">
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#51BBFE] text-[#222E50] px-6 py-2 rounded-full font-medium hover:bg-[#51BBFE]/90"
              >
                View Examples
              </a>
              <button
                onClick={onClose}
                className="border border-[#EFF9F0]/20 text-[#EFF9F0] px-6 py-2 rounded-full hover:bg-[#EFF9F0]/10"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeaturesGrid = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (card, e) => {
    e.preventDefault();
    
    if (card.id === 1) {
      navigate('/hireme');
    } else {
      window.open(card.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {portfolioCards.map((card) => (
          <motion.div
            key={card.id}
            className={`${card.span || ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href={card.link || "#"}
              onClick={(e) => handleCardClick(card, e)}
              className="block h-full"
            >
              <motion.div
                whileHover={{ 
                  y: -5,
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden h-full min-h-[320px]
                  p-10 rounded-xl cursor-pointer
                  transition-all duration-300`}
              >
                {(card.id === 1 || card.id === 2 || card.id === 3 || card.id === 4 || card.id === 5 || card.id === 6) && (
                  <>
                    <div className={`absolute inset-0 -z-10 bg-cover bg-center ${
                      card.id === 1 ? "bg-[url('/assets/portfolio-image.jpg')]" : 
                      card.id === 2 ? "bg-[url('/assets/showtime.jpg')]" :
                      card.id === 3 ? "bg-[url('/assets/footballend.jpg')]" :
                      card.id === 4 ? "bg-[url('/assets/backtobusiness.jpg')]" :
                      card.id === 5 ? "bg-[url('/assets/showtime.jpg')]" :
                      "bg-[url('/assets/footballend.jpg')]"
                    }`} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
                    <div className="absolute inset-0 border border-zinc-50/10 hover:border-zinc-50/20 rounded-xl transition-colors" />
                  </>
                )}
                <div className={`space-y-4 relative z-10`}>
                  {card.title && (
                    <h3 className="text-2xl font-semibold text-[#EFF9F0]">
                      {card.title}
                    </h3>
                  )}
                  {card.subtitle && (
                    <h2 className="text-5xl font-bold text-[#51BBFE]">
                      {card.subtitle}
                    </h2>
                  )}
                  {card.description && (
                    <p className="text-[#EFF9F0]/80 text-base">
                      {card.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </a>
          </motion.div>
        ))}
      </div>
      <Modal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        card={selectedCard}
      />
    </>
  );
};

export default FeaturesGrid;
