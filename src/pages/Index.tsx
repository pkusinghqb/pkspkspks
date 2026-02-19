import RoomCard from "@/components/RoomCard";

const rooms = [
  {
    title: "Tower Standard Room with Twin Bed and Garden View",
    beds: "2 single beds",
    price: 225,
    guests: 2,
    urgency: "Only 1 room left!",
    deal: true,
  },
  {
    title: "Deluxe King Room with City Skyline View",
    beds: "1 king bed",
    price: 310,
    guests: 2,
    urgency: "3 rooms left",
    deal: false,
  },
  {
    title: "Superior Suite with Balcony and Ocean View",
    beds: "1 king bed + sofa bed",
    price: 475,
    guests: 3,
    urgency: "Only 2 left!",
    deal: true,
  },
  {
    title: "Economy Double Room — Inner Courtyard",
    beds: "1 double bed",
    price: 165,
    guests: 2,
    urgency: null,
    deal: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          Select your room
        </h1>
        <div className="space-y-5">
          {rooms.map((room) => (
            <RoomCard key={room.title} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
