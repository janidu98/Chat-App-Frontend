import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();

  const { user } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  const handleSearch = async() => {
    if(!search) {
        toast({
            title: "Please enter name or email to search user",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: 'top-right'
        });
        return;
    }

    try {
        setLoading(true);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }

        const {data} = await axios.get(`/api/user?search=${search}`, config);
        setLoading(false);
        setSearchResult(data);
        // console.log(searchResult);

    } catch (error) {
        toast({
            title: 'Error Occured!',
            description: "Failed to load the search results",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left'
        });
    }
  }

  const accessChat = (userId) => {

  }

  return (  
    <>
        <Box
            display='flex' 
            justifyContent='space-between' 
            alignItems='center' 
            bg='white' 
            w='100%' 
            p='5px 10px 5px 10px' 
            borderWidth='5px'
        >
            {/* Search user */}
            <Tooltip  label='Search Users to chat' hasArrow placement='bottom-end'>
                <Button variant='ghost' onClick={onOpen}>
                    <i className="fas fa-search"></i>
                    <Text display={{base: "none", md: "flex"}} px='4'>Search User</Text>
                </Button>
            </Tooltip>

            {/* Name of the app */}
            <Text fontSize='2xl' fontFamily='Work sans'>
                Let's Chat
            </Text>

            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize='2xl' m={1}/>
                    </MenuButton>
                    {/* <MenuList></MenuList> */}
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                        <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
                    </MenuButton> 

                    <MenuList>
                        <ProfileModel user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModel>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}> 
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Search User</DrawerHeader>
                <DrawerBody>
                    <Box display='flex' pb={2}>
                        <Input 
                            placeholder='Search by name or email'
                            mr={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearch}>Go</Button>
                    </Box>
                    {loading ? <ChatLoading /> : (
                        searchResult?.map((user) => (
                            <UserListItem 
                                key={user._id}
                                user={user}
                                handleFunction={() => accessChat(user._id)}
                            />
                        ))
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer
