import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import DeleteModal from "./DeleteModal";

const ConvoCard = ({ convo, userEmail }: { convo: any, userEmail: string | null }) => {
  return (
      <Card key={convo.id}>
          <Link to={`/conversation/${convo.id}`}>
        <CardHeader>
          <CardTitle>{convo.conversationName}</CardTitle>
        </CardHeader>
            </Link>
        <CardContent className="flex items-center justify-end">
            {
                userEmail === convo.ownerId && <DeleteModal convoId={convo.id} />
            }
        </CardContent>
      </Card>
  );
};

export default ConvoCard;
