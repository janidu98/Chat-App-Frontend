import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const LoginPage = () => {
    const [show1, setShow1] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleClick1 = () => {
        setShow1(!show1);
    }

    const postDetails = (pic) => {

    }

    const sumbitHandler = () => {

    }

  return (
    <VStack spacing="5px" color="black">

      <FormControl id="emial2" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
            type='email'
            placeholder="Enter Your Email"
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
      >
        Login
      </Button>
    </VStack>
  )
}

export default LoginPage
