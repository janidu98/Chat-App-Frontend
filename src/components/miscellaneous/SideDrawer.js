import { Box, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <>
        <Box>
            <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>

            </Tooltip>
        </Box>
    </>
  )
}

export default SideDrawer
