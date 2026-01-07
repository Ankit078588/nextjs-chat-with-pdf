import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { connectDB } from "@/lib/db";
import { ChatModel } from "@/models/chat.model";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth"; 

export default async function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // 1. Auth Check
  const session = await auth();
  if (!session?.user) redirect("/");

  // 2. Rename id to chatId
  const { id: chatId } = await params; 
  await connectDB();

  // 3. Fetch chat-session by chatId to get the real docId
  let chat;
  try {
    chat = await ChatModel.findOne({_id: chatId}).select("docId");
  } catch(e) {
    redirect("/dashboard");
  }
  if (!chat) {
    redirect("/dashboard");
  }


  return (
    <div className="flex h-screen w-full overflow-hidden">
        <ChatSidebar docId={chat.docId.toString()} />   {/* Pass docId to sidebar */}
        <div className="flex-1 h-full">
            {children}
        </div>
    </div>
  );
}