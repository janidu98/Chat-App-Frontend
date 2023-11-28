import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    const toast = useToast();

    const handleAddUser = async(addUser) => {

        
        //check whether user already in group or not
        if(selectedChat.users.find((u) => u._id === addUser._id)) {
            toast({
                title: 'User already exists',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        //Only goup admin can add users to group.  
        if(selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: 'Only admin can add users!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
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

            const { data } = await axios.put('/api/chat/groupadd', {
                chatId: selectedChat._id,
                userId: addUser._id,
            }, config);

            setLoading(false);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);

        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

    }

    const handleRemove = async(removeUser) => {

        //Only goup admin can remove users to group.  
        if(selectedChat.groupAdmin._id !== user._id && removeUser._id !== user._id) {
            toast({
                title: 'Only admin can remove users!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
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

            const { data } = await axios.put(`/api/chat/groupremove`, {
                chatId: selectedChat._id,
                userId: removeUser._id,
            }, config);

            removeUser._id === user._id ? setSelectedChat() : setSelectedChat(data);

            setFetchAgain(!fetchAgain);
            setLoading(false);

        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.reponse.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
    }

    const handleRename = async() => {
        if(!groupChatName) return;

        try {
            setRenameLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName,
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);

        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            })
            setRenameLoading(false);

            setGroupChatName("");
        }
    }

    const handleSearch = async(query) => {
        setSearch(query);

        if(!search) return;

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: 'Failed to load the Search Results',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })
            setLoading(false);
        }
    }

    return (
      <>
        <IconButton display={{ base: 'flex'}} icon={<ViewIcon />} onClick={onOpen} />
        
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
                fontSize='35px'
                fontFamily='Work sans'
                display='flex'
                justifyContent='center'
            >
                {selectedChat.chatName}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Box display='flex' w='100%' flexWrap='wrap' pb={3}>
                {selectedChat.users.map((u) => (
                    <UserBadgeItem 
                        key={u._id}
                        user={u}
                        handleFunction={() => handleRemove(u)}
                    />
                ))}
              </Box>

              <FormControl display='flex'>
                <Input 
                    placeholder='Chat Name'
                    mb={3}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button 
                    variant='solid'
                    colorScheme='teal'
                    ml={1}
                    isLoading={renameLoading}
                    onClick={handleRename}
                >
                    Update
                </Button>
              </FormControl>

              <FormControl display='flex'>
                <Input 
                    placeholder='Add new user'
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>

              {loading ? (
                <Spinner size='lg' />
              ) : (
                searchResult?.map((user) => (
                    <UserListItem 
                        key={user._id}
                        user={user}
                        handleFunction={() => handleAddUser(user)}
                    />
                ))
              )}

            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='red' onClick={() => handleRemove(user)}>
                Leave Group
              </Button> 
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default UpdateGroupChatModal
