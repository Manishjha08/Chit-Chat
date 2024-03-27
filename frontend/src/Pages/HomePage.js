import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) navigate("/chats");
    }, [navigate]);

    return (
        <Container maxW="xl" centerContent>
            <Box 
                d="flex"
                justifyContent="center"
                p={3}
                bg="#b5e48c"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="20px"
            >
                <Text fontSize="4xl" fontFamily="Cursive" align="center">
                    Chit-Chat
                </Text>
            </Box>
            <Box bg="#000000" color="#b5e48c" w="100%" p={4} borderRadius="20px" borderWidth="8px" borderColor="#b5e48c">
                <Tabs isFitted variant="soft-rounded" colorScheme="orange" color="#a5ffd6">
                    <TabList mb="1rem">
                        <Tab>Login</Tab>
                        <Tab>Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
         </Container>
    );
}

export default HomePage;