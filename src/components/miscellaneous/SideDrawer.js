import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import Badge from 'react-bootstrap/Badge';

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();

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

  const accessChat = async(userId) => {
    try {
        setLoadingChat(true);

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };

        //create new chat
        const { data } = await axios.post('/api/chat', {userId}, config);

        if(!chats.find((chat) => chat._id === data._id)){
            setChats([data, ...chats]);
        }

        setSelectedChat(data);
        setLoadingChat(false);
        onClose();

    } catch (error) {
        toast({
            title: 'Error fetching chats!',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left'
        });
    }
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
                        {notification.length === 0 ? (<></>) 
                            : (<Badge bg='warning' bo>{notification.length}</Badge>)}
                        <BellIcon fontSize='2xl' m={1}/>
                    </MenuButton>
                    <MenuList pl={2}>
                        {!notification.length && 'No New Messages'}
                        
                        {notification.map((notif) => (
                            <MenuItem 
                                key={notif._id}
                                onClick={() => {
                                    // console.log(notif);
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
                    {loadingChat && <Spinner ml='auto' display='flex'/>}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer
