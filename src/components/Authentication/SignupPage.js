import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignupPage = () => {

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick1 = () => {
        setShow1(!show1);
    }

    const handleClick2 = () => {
      setShow2(!show2);
  }

    const postDetails = (pic) => {

    }

    const sumbitHandler = () => {

    }

  return (
    <VStack spacing="5px" color={'black'}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
            placeholder='Enter Your Name'
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            variant='outline'
            onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="emial" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
            type='email'
            placeholder='Enter Your Email'
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show1 ? "text" : "password"}
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
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignupPage
