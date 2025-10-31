import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { useParams } from 'react-router-dom';
import TipForm from './TipForm';

export default function LiveStream() {
 const { id } = useParams();
 const [client, setClient] = useState<any>(null);
 const [channel, setChannel] = useState<any>(null);
 const user = JSON.parse(localStorage.getItem('user') || '{}');

 useEffect(() => {
   const init = async () => {
     const chatClient = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY!);
     await chatClient.connectUser({ id: user.id }, chatClient.devToken(user.id));
     setClient(chatClient);
     const chan = chatClient.channel('livestream', id);
     await chan.watch();
     setChannel(chan);
   };
   init();
 }, [id, user.id]);

 if (!client || !channel) return <div>Loading...</div>;

 return (
   <div>
     <Chat client={client} theme="str-chat__theme-light">
       <Channel channel={channel}>
         <Window>
           <ChannelHeader />
           <MessageList />
           <MessageInput />
         </Window>
         <Thread />
       </Channel>
     </Chat>
     <TipForm creatorId={id || ''} />
   </div>
 );
}