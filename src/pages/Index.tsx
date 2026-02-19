import RoomCard from "@/components/RoomCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          Select your room
        </h1>
        <RoomCard />
      </div>
    </div>
  );
};

export default Index;
