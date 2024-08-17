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
            {[
              { name: '同族加速', effect: 20 },
              { name: '同族加速M', effect: 26.6 },
              { name: '同族加速L', effect: 33.3 },
              { name: '同族加速EL', effect: 36.6 },
              { name: '同族加撃速/同族加速命', effect: 16 },
              { name: '同族加撃速M/同族加速命M', effect: 21.2 },
              { name: '同族加撃速L/同族加速命L', effect: 26.6 },
              { name: '同族加撃速EL/同族加速命EL', effect: 29.3 },
              { name: '撃種加速/戦型加速', effect: 10 },
              { name: '撃種加速M/戦型加速M', effect: 13.3 },
              { name: '撃種加速L/戦型加速L', effect: 16.6 },
              { name: '撃種加速EL/戦型加速EL', effect: 18.3 },
              { name: '撃種or戦型加撃速/撃種or戦型加速命', effect: 8 },
              { name: '撃種or戦型加撃速M/撃種or戦型加速命M', effect: 10.6 },
              { name: '撃種or戦型加撃速L/撃種or戦型加速命L', effect: 13.2 },
              { name: '撃種or戦型加撃速EL/撃種or戦型加速命EL', effect: 14.5 },
            ].map((item, index) => (
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
