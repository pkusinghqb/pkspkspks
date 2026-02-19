import { Bed, ShowerHead, Wifi, Check, Users, Sparkles } from "lucide-react";
import roomImage from "@/assets/room-garden-view.jpg";
import type { RoomData, RateOption } from "@/pages/Index";

const RateRow = ({ rate, isFirst }: { rate: RateOption; isFirst: boolean }) => (
  <div className={`flex flex-col lg:flex-row ${!isFirst ? "border-t border-border" : ""}`}>
    {/* Benefits */}
    <div className="flex-1 p-4">
      {isFirst && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 block">
          Benefits
        </span>
      )}

      {rate.deal && rate.cheapest && (
        <span className="inline-flex items-center gap-1.5 bg-deal-bg text-deal text-xs font-semibold px-3 py-1 rounded-full mb-3">
          <Sparkles className="h-3 w-3" />
          Lowest price available!
        </span>
      )}

      <div className="space-y-2">
        {rate.benefits.map((b, i) => {
          const isWifi = b.toLowerCase().includes("wifi");
          return (
            <div key={i} className="flex items-center gap-2.5">
              {isWifi ? (
                <Wifi className="h-4 w-4 text-primary/70 shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </div>
              )}
              <span className="text-sm text-card-foreground">{b}</span>
            </div>
          );
        })}
        {rate.highlightBenefit && (
          <div className="flex items-center gap-2.5">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${rate.flexible ? "bg-deal/10" : "bg-deal/10"}`}>
              <Check className={`h-3 w-3 ${rate.flexible ? "text-deal" : "text-deal"}`} />
            </div>
            <span className={`text-sm font-medium ${rate.flexible ? "text-deal" : "text-deal"}`}>
              {rate.highlightBenefit}
            </span>
          </div>
        )}
      </div>
    </div>

    {/* Guests */}
    <div className="lg:w-[90px] p-4 border-t lg:border-t-0 lg:border-l border-border flex items-start justify-center">
      {isFirst && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground lg:hidden mb-2 block">
          Guests
        </span>
      )}
      <div className="flex items-center pt-6">
        <Users className="h-6 w-6 text-muted-foreground/80" />
      </div>
    </div>

    {/* Price */}
    <div className="lg:w-[160px] p-4 border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center text-center">
      {isFirst && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
          Price
        </span>
      )}
      {rate.cheapest && (
        <p className="text-[10px] font-bold uppercase tracking-wider text-urgency mb-1 flex items-center gap-1">
          🔥 Cheapest price you've seen!
        </p>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-xs text-muted-foreground">USD</span>
        <span className="text-3xl font-display font-bold text-card-foreground">{rate.price}</span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5">Per night before taxes and fees</p>
    </div>

    {/* Book CTA */}
    <div className="lg:w-[150px] p-4 border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center text-center gap-2">
      <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
        Book now
      </button>
      <p className="text-[11px] text-muted-foreground">It only takes 2 minutes</p>
      {rate.urgency && (
        <p className="text-xs font-bold text-urgency">🔥 {rate.urgency}</p>
      )}
      {rate.flexible && (
        <div className="text-center">
          <p className="text-xs font-bold text-deal">FLEXIBLE!</p>
          <p className="text-xs font-semibold text-deal">Cancel for free</p>
        </div>
      )}
    </div>
  </div>
);

const RoomCard = ({ room }: { room: RoomData }) => {
  return (
    <div className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
      {/* Room title header */}
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <h2 className="text-lg md:text-xl font-display font-semibold text-card-foreground">
          {room.title}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: Image + Amenities */}
        <div className="lg:w-[200px] p-4 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-border">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={roomImage}
              alt={room.title}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <button className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm text-xs font-medium text-primary px-3 py-1.5 rounded-full hover:bg-card transition-colors">
              Room photos and details
            </button>
          </div>

          <div className="space-y-2">
            {room.beds && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bed className="h-4 w-4 text-primary/70 shrink-0" />
                <span>{room.beds}</span>
              </div>
            )}
            {room.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground">
                {amenity.toLowerCase().includes("shower") ? (
                  <ShowerHead className="h-4 w-4 text-primary/70 shrink-0" />
                ) : (
                  <Wifi className="h-4 w-4 text-primary/70 shrink-0" />
                )}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Rate rows */}
        <div className="flex-1 flex flex-col">
          {/* Column headers - desktop only */}
          <div className="hidden lg:flex border-b border-border">
            <div className="flex-1 px-4 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Benefits</span>
            </div>
            <div className="w-[90px] px-4 py-2 border-l border-border text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Guests</span>
            </div>
            <div className="w-[160px] px-4 py-2 border-l border-border text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price</span>
            </div>
            <div className="w-[150px] px-4 py-2 border-l border-border" />
          </div>

          {room.rates.map((rate, i) => (
            <RateRow key={i} rate={rate} isFirst={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
