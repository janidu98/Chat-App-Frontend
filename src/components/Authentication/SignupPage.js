import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignupPage = () => {

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick1 = () => {
        setShow1(!show1);
    }

    const handleClick2 = () => {
      setShow2(!show2);
  }

    const postDetails = (pics) => {
      setLoading(true);

      if(pics === undefined) {
        toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
        return;
      }

      if(pics.type === 'image/jpeg' || pics.type === 'image/png') {
        const data = new FormData();
        data.append('file', pics);
        data.append('upload_preset', 'chat-app');
        data.append('cloud_name', 'ddgzguuxt');
        fetch("https://api.cloudinary.com/v1_1/ddgzguuxt/image/upload", {
          //mode: 'no-cors',
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            console.log(data);
            setLoading(false);
          })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            })
      } else {
        toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
        return;
      }
    }

    const sumbitHandler = async() => {
      setLoading(true);

      if(!name || !email || !password || !confirmPassword){
        toast({
          title: 'All Fields are required!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
        return;
      }

      if(password !== confirmPassword) {
        toast({
          title: 'Passwords Do Not Match!',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          }
        }

        const {data} = await axios.post("/api/user", {name, email, password, pic}, config);

        toast({
          title: 'Registration Success',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);

        navigate("/chats");

      } catch (error) {
        toast({
          title: 'Error Occured!!',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
      }
    }

  return (
    <VStack spacing="5px" color={'black'}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
            placeholder='Enter Your Name'
            value={name}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            variant='outline'
            onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="emial1" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
            type='email'
            value={email}
            placeholder='Enter Your Email'
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password1" isRequired>
        <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show1 ? "text" : "password"}
                    value={password}
                    placeholder='Enter New Password'
                    onChange={(e) => setPassword(e.target.value)}
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
                />
                <InputRightElement width={'4.5rem'}>
                    <Button variant='soft-rounded' color="black" h={'1.75rem'} size="sm" onClick={handleClick1}>
                        {show1 ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show2 ? "text" : "password"}
                    value={confirmPassword}
                    placeholder='Enter Password Again'
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width={'4.5rem'}>
                    <Button variant='soft-rounded' color="black" h={'1.75rem'} size="sm" onClick={handleClick2}>
                        {show2 ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input 
            type='file'
            p={1.5}
            accept='image/*'
            onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme='blue'
        width='100%'
        color='white'
        style={{ marginTop: 15 }}
        onClick={sumbitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignupPage
