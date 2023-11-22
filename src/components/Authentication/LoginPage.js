import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [show1, setShow1] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigate();

    const handleClick1 = () => {
        setShow1(!show1);
    }

    const sumbitHandler = async() => {
      setLoading(true);

      if(!email || !password) {
        toast({
          title: "All fields are required!",
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        })
        setLoading(false);
        return;
      }

      try {
        
        const config = {
          headers: {
            "Content-type" : "application/json",
          },
        };

        const { data } = await axios.post("/api/user/login", { email, password }, config);

        //Login successful msg
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);

        navigate("/chats");

      } catch (error) {
        toast({
          title: "Login Error!",
          description: error.description.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    }

  return (
    <VStack spacing="5px" color="black">

      <FormControl id="emial2" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
            type='email'
            placeholder="Enter Your Email"
            value={email}
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setEmail(e.target.value)}
            color="black"
        />
      </FormControl>

      <FormControl id="password2" isRequired>
        <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show1 ? "text" : "password"}
                    value={password}
                    placeholder='Enter Password'
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width={'4.5rem'}>
                    <Button variant='soft-rounded' color="black" h={'1.75rem'} size="sm" onClick={handleClick1}>
                        {show1 ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
      </FormControl>

      <Button
        colorScheme='blue'
        width='100%'
        color='white'
        style={{ marginTop: 15 }}
        onClick={sumbitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      {/* Login as Guest User */}
      <Button
        variant='solid'
        colorScheme='red'
        width='100%'
        color= 'white'
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("12345");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default LoginPage
