import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const GroupChatModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleSubmit = () => {

    }

    const handleSearch = async(query) => {
        setSearch(query)
        if(!query) {
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            // console.log(data);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: 'Failed to load the search result',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    }

    const handleGroup = () => {

    }

    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader
                fontSize='35px'
                fontFamily='Work sans'
                display='flex'
                justifyContent='center'
            >
                Create Group Chat
            </ModalHeader>

            <ModalCloseButton />

            <ModalBody
                display='flex'
                flexDir='column'
                alignItems='center'
            >
                <FormControl>
                    <Input 
                        placeholder='Type Chat Name' 
                        mb={3} 
                        onChange={(e) => setGroupChatName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input 
                        placeholder='Add Users eg: John, Sumith' 
                        mb={1} 
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>

                {loading ? <div>loading</div> : (
                    searchResult?.slice(0,4).map((user) => (
                        <UserListItem 
                            key={user._id} 
                            user={user} 
                            handleFunction={() => handleGroup(user)}
                        />
                    ))
                )}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleSubmit}>
                Create Chat
              </Button>
            </ModalFooter>

          </ModalContent>
        </Modal>
      </>
    )
}

export default GroupChatModal
