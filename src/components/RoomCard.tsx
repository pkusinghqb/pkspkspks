import { Bed, ShowerHead, Wifi, Check, Users, Sparkles } from "lucide-react";
import roomImage from "@/assets/room-garden-view.jpg";

const RoomCard = () => {
  return (
    <div className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-xl md:text-2xl font-display font-semibold text-card-foreground">
          Tower Standard Room with Twin Bed and Garden View
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: Image + Amenities */}
        <div className="lg:w-[280px] p-5 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={roomImage}
              alt="Twin bed room with garden view"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <button className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm text-xs font-medium text-primary px-3 py-1.5 rounded-full hover:bg-card transition-colors">
              View photos
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { icon: Bed, label: "2 single beds" },
              { icon: ShowerHead, label: "Rain shower" },
              { icon: Wifi, label: "Free high-speed WiFi" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary/70" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Benefits */}
        <div className="flex-1 p-5 border-t lg:border-t-0 lg:border-l border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Benefits</span>
          </div>

          <span className="inline-flex items-center gap-1.5 bg-deal-bg text-deal text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="h-3 w-3" />
            Lowest price available
          </span>

          <div className="rounded-xl bg-secondary/50 p-4 space-y-3">
            {[
              { text: "Room only", highlight: false },
              { text: "Non-refundable — Great price!", highlight: true },
              { text: "Book and pay now", highlight: false },
              { text: "Free WiFi included", highlight: false },
            ].map(({ text, highlight }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${highlight ? "bg-deal/10" : "bg-primary/10"}`}>
                  <Check className={`h-3 w-3 ${highlight ? "text-deal" : "text-primary"}`} />
                </div>
                <span className={`text-sm ${highlight ? "text-deal font-medium" : "text-card-foreground"}`}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Guests + Price + CTA */}
        <div className="lg:w-[260px] p-5 border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="text-sm">2 guests</span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-urgency animate-pulse-soft mb-1">
              Best price you'll find
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm text-muted-foreground">USD</span>
              <span className="text-4xl font-display font-bold text-card-foreground">225</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">per night · before taxes</p>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
            Book now
          </button>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">It only takes 2 minutes</p>
            <p className="text-xs font-semibold text-urgency">🔥 Only 1 room left!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
