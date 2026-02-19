import { useState } from "react";
import { Search, MapPin, Calendar as CalendarIcon, Users, Minus, Plus, X, Sparkles } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type TabMode = "search" | "aide";

const categories = [
  { label: "Any", emoji: "✨", default: true },
  { label: "Couple", emoji: "👫" },
  { label: "Luxury", emoji: "🏨" },
  { label: "Budget", emoji: "🏠" },
  { label: "Solo", emoji: "🧳" },
  { label: "Biz", emoji: "🏢" },
];

const trendingSearches = [
  { label: "Dubai 5-star", emoji: "🏙️" },
  { label: "Cheap Tokyo", emoji: "🗼" },
  { label: "Luxury Bali", emoji: "🌴" },
  { label: "Budget Bangkok", emoji: "🔺" },
  { label: "Beach Phuket", emoji: "🏖️" },
];

const SearchBox = () => {
  const [mode, setMode] = useState<TabMode>("search");
  const [location, setLocation] = useState("Tokyo");
  const [guests, setGuests] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState<Date>(new Date(2025, 2, 21));
  const [checkOut, setCheckOut] = useState<Date>(new Date(2025, 2, 23));
  const [selectedCategory, setSelectedCategory] = useState("Any");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarStep, setCalendarStep] = useState<"checkin" | "checkout">("checkin");

  const nights = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border p-5 space-y-4">
        {/* Row 1: Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-secondary rounded-full p-1">
            <button
              onClick={() => setMode("search")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                mode === "search"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Search className="h-3.5 w-3.5" />
              Search
            </button>
            <button
              onClick={() => setMode("aide")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                mode === "aide"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Aide
            </button>
          </div>
        </div>

        {/* Row 2: Date + Nights badge + Guest counter — compact single row */}
        <div className="flex items-center gap-3">
          <Popover open={calendarOpen} onOpenChange={(open) => { setCalendarOpen(open); if (open) setCalendarStep("checkin"); }}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 bg-secondary/60 border border-border rounded-full px-4 py-2 hover:border-primary/40 transition-colors cursor-pointer">
                <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {format(checkIn, "EEE, d MMM")} – {format(checkOut, "EEE, d MMM")}
                </span>
                <span className="text-xs font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded ml-1">{nights}N</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col sm:flex-row">
                <div className={cn("p-3 border-b sm:border-b-0 sm:border-r border-border", calendarStep === "checkin" && "bg-secondary/30")}>
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
                        setCalendarStep("checkout");
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </div>
                <div className={cn("p-3", calendarStep === "checkout" && "bg-secondary/30")}>
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Check-out</p>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      if (date) {
                        setCheckOut(date);
                        setCalendarOpen(false);
                      }
                    }}
                    disabled={(date) => date <= checkIn}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Guest counter */}
          <div className="flex items-center gap-2 bg-secondary/60 border border-border rounded-full px-3 py-2">
            <Users className="h-4 w-4 text-primary shrink-0" />
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-sm font-bold text-foreground w-4 text-center">{guests}</span>
            <button
              onClick={() => setGuests(Math.min(10, guests + 1))}
              className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Row 3: Search input */}
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
              ? 'Try "cheap 5-star Tokyo this weekend" or "surprise me"'
              : "Search another city or hotel..."
          }
          className="w-full bg-transparent border-t border-border pt-3 pb-1 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />

        {/* Row 4: Categories + Action buttons — same row */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                  selectedCategory === cat.label
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-sm hover:shadow-md transition-all active:scale-95">
              <Sparkles className="h-3.5 w-3.5" />
              Surprise me
            </button>
            <button
              onClick={() => setMode("aide")}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/20 hover:bg-primary/25 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Aide
            </button>
          </div>
        </div>
      </div>

      {/* Trending searches */}
      <div className="flex items-center justify-center gap-2.5 mt-4 flex-wrap">
        {trendingSearches.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-card/60 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
          >
            <span>{item.emoji}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
