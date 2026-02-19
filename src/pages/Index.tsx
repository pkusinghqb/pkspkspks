import RoomCard from "@/components/RoomCard";

export interface RateOption {
  benefits: string[];
  highlightBenefit?: string;
  price: number;
  cheapest?: boolean;
  urgency?: string;
  flexible?: boolean;
  deal?: boolean;
}

export interface RoomData {
  title: string;
  beds: string;
  amenities: string[];
  rates: RateOption[];
  guests: number;
}

const rooms: RoomData[] = [
  {
    title: "Tower Standard Room with Twin Bed and Garden View",
    beds: "2 single beds",
    amenities: ["Shower", "Free WiFi"],
    guests: 2,
    rates: [
      {
        benefits: ["Room only", "Book and pay now", "Free WiFi"],
        highlightBenefit: "Non-refundable (Low price!)",
        price: 225,
        cheapest: true,
        urgency: "Our last room!",
        deal: true,
      },
    ],
  },
  {
    title: "Garden Tower Standard Room",
    beds: "1 queen bed",
    amenities: ["Shower", "Free WiFi"],
    guests: 2,
    rates: [
      {
        benefits: ["Room only", "Book and pay now", "Free WiFi"],
        highlightBenefit: "Free cancellation",
        price: 231,
        flexible: true,
      },
      {
        benefits: ["Room only", "Book and pay now", "Free WiFi"],
        highlightBenefit: "Non-refundable (Low price!)",
        price: 287,
        urgency: "Our last room!",
        deal: true,
      },
    ],
  },
  {
    title: "Tower Standard Room with Twin Bed and Garden View and Garden View",
    beds: "2 single beds",
    amenities: ["Shower", "Free WiFi"],
    guests: 2,
    rates: [
      {
        benefits: ["Room only", "Book and pay now", "Free WiFi"],
        highlightBenefit: "Non-refundable (Low price!)",
        price: 232,
        urgency: "Our last room!",
        deal: true,
      },
    ],
  },
  {
    title: "Garden Tower Standard Room, Garden View",
    beds: "1 king bed",
    amenities: ["Shower", "Free WiFi"],
    guests: 2,
    rates: [
      {
        benefits: ["Room only", "Book and pay now", "Free WiFi"],
        highlightBenefit: "Non-refundable (Low price!)",
        price: 302,
        urgency: "Our last room!",
        deal: true,
      },
    ],
  },
  {
    title: "Double Room",
    beds: "",
    amenities: ["Shower", "Free WiFi"],
    guests: 2,
    rates: [
      {
        benefits: ["Room only", "Book and pay now", "Free WiFi"],
        highlightBenefit: "Free cancellation before Mon, Feb 16",
        price: 305,
        flexible: true,
      },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          Explore Our Rooms
        </h1>
        <div className="space-y-6">
          {rooms.map((room) => (
            <RoomCard key={room.title} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
