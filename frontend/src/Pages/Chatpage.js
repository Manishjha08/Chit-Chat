import { Box } from '@chakra-ui/layout';
import { useState } from 'react';

import Chatbox from "../Components/Chatbox";
import  MyChats from "../Components/MyChats";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box 
                display="flex"
                width="100%" 
                height="91.5vh" 
                padding="10px"
                justifyContent="space-between"  
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (
                    <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                )}
            </Box>
        </div>
    );
};

export default Chatpage;