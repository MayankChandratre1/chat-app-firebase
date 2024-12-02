import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { deleteMessage } from '@/lib/firestore.actions';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

interface MessageCardProps {
  conversationId: string;
  messageId: string;
  senderName: string;
  message: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  currentUserName: string;
}

export function MessageCard({
  conversationId,
  messageId,
  senderName,
  message,
  createdAt,
  currentUserName,
}: MessageCardProps) {
  const isCurrentUser = currentUserName === senderName;
  const createdAtDate = createdAt?.seconds ? new Date(createdAt.seconds * 1000) : new Date();

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
        {!isCurrentUser && (
          <p className="text-xs text-gray-400 font-semibold mb-1 flex justify-between gap-1">{senderName} <span className="text-gray-400 text-end">{format(createdAtDate, 'HH:mm')}</span></p>
        )}
        <p className="text-sm mb-1">{message}</p>
        <p className="text-xs text-right opacity-70">
          {format(createdAtDate, 'dd.MM.yyyy')}
        </p>
        
      </div>
      
    </div>
    {isCurrentUser && (
          <div className={cn(
            "flex w-full mb-4",
            isCurrentUser ? "justify-end" : "justify-start"
          )}>
            <Button
            onClick={() => {
              deleteMessage(conversationId, messageId)
            }}
            variant="ghost"
            className="text-gray-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-100 transition duration-200"
            title="Delete message"
          >
            <Trash2 size={8} />
          </Button>
          </div>
        )}
    </>
  );
}
