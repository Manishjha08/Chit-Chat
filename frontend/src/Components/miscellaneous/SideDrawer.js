import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";

import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModel";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const handleSearch = async () => {
        if (!search) {
          toast({
            title: "Please Enter something in search",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
    
          setLoading(false);
          setSearchResult(data);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);
    
        try {
          setLoadingChat(true);
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);
    
          if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
          setSelectedChat(data);
          setLoadingChat(false);
          onClose();
        } catch (error) {
          toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
    };

    return (
        <>
            <Box
                fontFamily="cursive"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="#aacc00"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="10px"
                borderColor="#07beb8"
                borderRadius="20px"
            >
            <Tooltip 
              label="Search Users to chat" 
              hasArrow 
              placement="bottom-end"
            >
            <Button variant="ghost" onClick={onOpen}>
                <i className="fas fa-search"></i>
                <Text d={{ base: "none", md: "flex" }} px={4}>
                  Search User
                </Text>
              </Button>
            </Tooltip>
            <Text fontSize="3xl" >
              Chit-Chat
            </Text>
            <div>
              <Menu>
                <MenuButton p={1}>
                  <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                  />
                  <BellIcon fontSize="3xl" m={1} />
                </MenuButton>
                <MenuList pl={2} bg="#1f1f1f" color="#ccff33" borderColor="#06d6a0">
                  {!notification.length && "No New Messages"}
                  {notification.map((notif) => (
                    <MenuItem
                      bg="black"
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(user, notif.chat.users)}`}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton as={Button} bg="#c4fff9"  borderWidth="2px" borderColor="black" rightIcon={<ChevronDownIcon />}>
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                  />
                </MenuButton>
                <MenuList bg="#ade8f4" borderWidth="2px" borderColor="black">
                  <ProfileModal user={user}>
                    <MenuItem bg="#48cae4" color="black" fontSize="20px">My Profile</MenuItem>{" "}
                  </ProfileModal>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler} bg="#48cae4" color="black" fontSize="20px">Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </Box>
    
          <Drawer placement="left"  onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg="#ade8f4" fontFamily="cursive" borderWidth="10px" borderColor="#0096c7" borderRadius="20px">
              <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
              <DrawerBody>
                <Box display="flex" pb={2} >
                  <Input
                    bg="#94d2bd"
                    coor="#000000"
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch} bg="#ffddd2">Go</Button>
                </Box>
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )}
                {loadingChat && <Spinner ml="auto" display="flex" />}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
    );
}
    
export default SideDrawer;
