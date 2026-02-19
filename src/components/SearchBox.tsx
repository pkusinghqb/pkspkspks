import { useState } from "react";
import { Search, MapPin, Calendar as CalendarIcon, Users, Minus, Plus, X, Sparkles } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type TabMode = "search" | "aide";

const quickStays = [
  { label: "1N", emoji: "⚡" },
  { label: "2N", emoji: "🌙", default: true },
  { label: "3N", emoji: "✈️" },
  { label: "5N", emoji: "🌅" },
  { label: "7N", emoji: "🌴" },
];

const SearchBox = () => {
  const [mode, setMode] = useState<TabMode>("search");
  const [location, setLocation] = useState("Tokyo");
  const [guests, setGuests] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState<Date>(new Date(2025, 1, 21));
  const [checkOut, setCheckOut] = useState<Date>(new Date(2025, 1, 23));
  const [selectedNights, setSelectedNights] = useState("2N");

  const nights = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border p-5 space-y-4">
        {/* Top row: Tabs + Location */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Mode tabs */}
          <div className="flex items-center bg-secondary rounded-full p-1">
            <button
              onClick={() => setMode("search")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
                mode === "search"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              onClick={() => setMode("aide")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
                mode === "aide"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="h-4 w-4" />
              Aide
            </button>
          </div>

          {/* Location pill */}
          {location && (
            <div className="flex items-center gap-1.5 bg-secondary border border-border rounded-full px-4 py-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{location}</span>
              <button
                onClick={() => setLocation("")}
                className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Date & Guest row */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Date selector with calendar popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2.5 bg-secondary/60 border border-border rounded-xl px-4 py-2.5 flex-1 min-w-[220px] hover:border-primary/40 transition-colors cursor-pointer text-left">
                <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {format(checkIn, "EEE, d MMM")} – {format(checkOut, "EEE, d MMM")}
                  </span>
                  <span className="text-xs text-primary font-medium">{nights} nights</span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col sm:flex-row">
                <div className="p-3 border-b sm:border-b-0 sm:border-r border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Check-in</p>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      if (date) {
                        setCheckIn(date);
                        if (date >= checkOut) {
                          setCheckOut(addDays(date, 1));
                        }
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Check-out</p>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      if (date) setCheckOut(date);
                    }}
                    disabled={(date) => date <= checkIn}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Guest counter */}
          <div className="flex items-center gap-3 bg-secondary/60 border border-border rounded-xl px-4 py-2.5">
            <Users className="h-4 w-4 text-primary shrink-0" />
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-lg font-bold text-foreground w-5 text-center">{guests}</span>
            <button
              onClick={() => setGuests(Math.min(10, guests + 1))}
              className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={mode === "aide" ? searchQuery : location ? "" : ""}
            onChange={(e) =>
              mode === "aide"
                ? setSearchQuery(e.target.value)
                : setLocation(e.target.value)
            }
            placeholder={
              mode === "aide"
                ? "Ask anything about your trip..."
                : "Search another city or hotel..."
            }
            className="w-full bg-transparent border-t border-border pt-4 pb-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        {/* Quick stays */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Quick stay</span>
          {quickStays.map((stay) => (
            <button
              key={stay.label}
              onClick={() => setSelectedNights(stay.label)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                selectedNights === stay.label
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{stay.emoji}</span>
              {stay.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating search button */}
      <div className="flex justify-end -mt-5 mr-2 relative z-10">
        <button className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/40 active:scale-95">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
