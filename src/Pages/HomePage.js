import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Login from '../components/Authentication/LoginPage';
import SignUp from '../components/Authentication/SignupPage';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={'white'}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color={'black'} textAlign="center">Let's Chat</Text>
      </Box>

      <Box
        bg="white"
        p={4}
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant='soft-rounded'>

          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>

        </Tabs>

      </Box>
    </Container>
  )
}

export default HomePage
