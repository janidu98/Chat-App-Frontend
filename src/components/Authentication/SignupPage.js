import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignupPage = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick = () => {
        setShow(!show);
    }

  return (
    <VStack spacing="5px" color={'black'}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
            placeholder='Enter Your Name'
            onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="emial" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
            type='email'
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show ? "text" : "password"}
                    placeholder='Enter New Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width={'4.5rem'}>
                    <Button variant='soft-rounded' color="black" h={'1.75rem'} size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
      </FormControl>
    </VStack>
  )
}

export default SignupPage
