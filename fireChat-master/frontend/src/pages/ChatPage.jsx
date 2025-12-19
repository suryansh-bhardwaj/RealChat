import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// Check if Stream API key is available
if (!STREAM_API_KEY) {
  console.error("Stream API key is not set in environment variables");
}

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  // Check if targetUserId exists, if not redirect to home
  useEffect(() => {
    if (!targetUserId) {
      toast.error("Invalid chat. User ID is missing.");
      navigate("/");
    }
  }, [targetUserId, navigate]);

  const { data: tokenData, isLoading: isTokenLoading, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  // Log token error if any
  useEffect(() => {
    if (tokenError) {
      console.error("Error fetching stream token:", tokenError);
      toast.error("Failed to get chat authorization");
    }
  }, [tokenError]);

  useEffect(() => {
    const initChat = async () => {
      // Debug logs
      console.log("Debug info:", {
        tokenAvailable: !!tokenData?.token,
        authUserAvailable: !!authUser,
        targetUserIdAvailable: !!targetUserId,
        apiKey: STREAM_API_KEY,
      });

      if (!tokenData?.token || !authUser || !targetUserId) {
        console.log("Missing required data:", {
          token: tokenData?.token ? "Available" : "Missing",
          authUser: authUser ? "Available" : "Missing",
          targetUserId: targetUserId ? "Available" : "Missing"
        });
        setLoading(false);
        return;
      }

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        console.log("Creating channel with ID:", channelId);
        console.log("Members:", [authUser._id, targetUserId]);

        // Create channel with proper member format
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
          created_by_id: authUser._id,
        });

        await currChannel.watch();
        console.log("Channel created successfully:", currChannel);

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Clean up function to disconnect the user when component unmounts
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  // Debug logs for render condition
  console.log("Render conditions:", {
    loading,
    isTokenLoading,
    chatClientAvailable: !!chatClient,
    channelAvailable: !!channel
  });

  if (loading || isTokenLoading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;