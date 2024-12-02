import { cn } from "@/lib/utils";
    
interface AIMessageCardProps {
  role: "user" | "model";
  text: string;
}

export function AIMessageCard({
  role,
  text
}: AIMessageCardProps) {
  const isCurrentUser = role === "user";

  return (
    <>
    <div
      className={cn(
        "flex w-full mb-1",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 relative",
          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        )}
      >
        <p className="text-sm mb-1">{text}</p>
      </div>
      
    </div>
    {isCurrentUser && (
          <div className={cn(
            "flex w-full mb-4",
            isCurrentUser ? "justify-end" : "justify-start"
          )}>
          </div>
        )}
    </>
  );
}
