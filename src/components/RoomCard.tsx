import { Bed, ShowerHead, Wifi, Check, Users, Sparkles } from "lucide-react";
import roomImage from "@/assets/room-garden-view.jpg";

interface RoomData {
  title: string;
  beds: string;
  price: number;
  guests: number;
  urgency: string | null;
  deal: boolean;
}

const RoomCard = ({ room }: { room: RoomData }) => {
  return (
    <div className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <h2 className="text-lg md:text-xl font-display font-semibold text-card-foreground">
          {room.title}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: Image + Amenities */}
        <div className="lg:w-[240px] p-4 flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={roomImage}
              alt={room.title}
              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <button className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm text-xs font-medium text-primary px-3 py-1.5 rounded-full hover:bg-card transition-colors">
              View photos
            </button>
          </div>

          <div className="space-y-2">
            {[
              { icon: Bed, label: room.beds },
              { icon: ShowerHead, label: "Shower" },
              { icon: Wifi, label: "Free WiFi" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary/70 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Benefits */}
        <div className="flex-1 p-4 border-t lg:border-t-0 lg:border-l border-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Benefits</span>

          {room.deal && (
            <span className="inline-flex items-center gap-1.5 bg-deal-bg text-deal text-xs font-semibold px-3 py-1 rounded-full mt-3 mb-3">
              <Sparkles className="h-3 w-3" />
              Lowest price available
            </span>
          )}

          <div className={`rounded-xl bg-secondary/50 p-4 space-y-2.5 ${!room.deal ? "mt-3" : ""}`}>
            {[
              { text: "Room only", highlight: false },
              { text: "Non-refundable", highlight: room.deal },
              { text: "Book and pay now", highlight: false },
              { text: "Free WiFi included", highlight: false },
            ].map(({ text, highlight }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${highlight ? "bg-deal/10" : "bg-primary/10"}`}>
                  <Check className={`h-3 w-3 ${highlight ? "text-deal" : "text-primary"}`} />
                </div>
                <span className={`text-sm ${highlight ? "text-deal font-medium" : "text-card-foreground"}`}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Price + CTA */}
        <div className="lg:w-[230px] p-4 border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">{room.guests} guests</span>
          </div>

          <div>
            {room.deal && (
              <p className="text-xs font-bold uppercase tracking-wider text-urgency animate-pulse-soft mb-1">
                Best price
              </p>
            )}
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm text-muted-foreground">USD</span>
              <span className="text-3xl font-display font-bold text-card-foreground">{room.price}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">per night · before taxes</p>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
            Book now
          </button>

          {room.urgency && (
            <p className="text-xs font-semibold text-urgency">🔥 {room.urgency}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
