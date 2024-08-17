import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Collapse, 
  useDisclosure 
} from '@chakra-ui/react';
import { useState } from 'react';
import { getSortedWakuwaku } from '../constants/wakuwakuMaster';

const SpeedTool = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [speed, setSpeed] = useState<number>(401.0);
  const [lowerLimit, setLowerLimit] = useState<number>(417.20);
  const [upperLimit, setUpperLimit] = useState<number>(421.93);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handleLowerLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowerLimit(parseFloat(e.target.value));
  };

  const handleUpperLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpperLimit(parseFloat(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("計算結果を表示します");
  };

  return (
    <Box
      borderWidth="2px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      p={6}
      m="10px auto"
      mb={10}
      mt={5}
      maxW={{ base: "95%", md: "70%", lg: "70%" }}
      as="form"
      onSubmit={handleSubmit}
    >
      <Heading
        px={6}
        mb={5}
        fontWeight={600}
        textAlign="center"
        fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }}
        lineHeight={{ base: '160%', sm: '150%' }}
      >
        スピード調整ツール
      </Heading>

      <FormControl isRequired>
        <FormLabel fontWeight={600} htmlFor="speed">現在のスピード</FormLabel>
        <Input 
          id="speed" 
          name="speed" 
          type="number" 
          step="0.01" 
          value={speed ?? ''} 
          onChange={handleSpeedChange} 
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="lowerLimit">調整したいスピード(下限)</FormLabel>
        <Input 
          id="lowerLimit" 
          name="lowerLimit" 
          type="number" 
          step="0.01" 
          value={lowerLimit} 
          onChange={handleLowerLimitChange} 
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="upperLimit">調整したいスピード(上限)</FormLabel>
        <Input 
          id="upperLimit" 
          name="upperLimit" 
          type="number" 
          step="0.01" 
          value={upperLimit} 
          onChange={handleUpperLimitChange} 
        />
      </FormControl>

      <Button mt={4} colorScheme="blue" bg="blue.400" onClick={handleSubmit} type="submit">
        計算する！
      </Button>

      <Button mt={4} colorScheme="blue" bg="blue.400" onClick={onToggle} className="toggle-button">
        加速の実一覧表: 開く/閉じる
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <Table variant="simple" mt={4} id="wakuwakuMaster">
          <Thead>
            <Tr>
              <Th>実の名称</Th>
              <Th>効果量</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getSortedWakuwaku().map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.effect}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </Box>
  );
};

export default SpeedTool;
