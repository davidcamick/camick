import Marquee from "./marquee";  // Changed to default import
import { AuroraText } from "./aurora-text";

const reviews = [
  {
    text: "David's work exceeded our expectations! His attention to detail and creativity brought our vision to life.",
    author: "Coach Williams",
    org: "Auburn University"
  },
  {
    text: "The quality and turnaround time were incredible. Best sports videographer we've worked with.",
    author: "Michael Thompson",
    org: "Elite Sports Academy"
  },
  {
    text: "David has a unique ability to capture the intensity and emotion of every game. Outstanding work!",
    author: "Sarah Martinez",
    org: "St. Pius X Athletics"
  },
  {
    text: "The highlight reel he created for our team was exactly what we needed. Pure excellence!",
    author: "James Wilson",
    org: "City Reapers"
  }
];

export function Reviews() {
  return (
    <section className="w-full py-24 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-[#EFF9F0] flex items-center justify-center gap-3">
          I make an <AuroraText>Impact</AuroraText> on my clients, too.
        </h2>
      </div>
      
      <div className="relative">
        <Marquee className="py-4" pauseOnHover>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="mx-8 px-8 py-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-50/10 w-[400px]"
            >
              <p className="text-[#EFF9F0]/80 text-lg mb-4">"{review.text}"</p>
              <div>
                <p className="text-[#51BBFE] font-medium">{review.author}</p>
                <p className="text-[#EFF9F0]/60 text-sm">{review.org}</p>
              </div>
            </div>
          ))}
        </Marquee>
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>
    </section>
  );
}
