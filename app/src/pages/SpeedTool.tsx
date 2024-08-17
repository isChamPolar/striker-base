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
  useDisclosure,
  Spinner,
  VStack,
  HStack,
  Text,
  Flex
} from '@chakra-ui/react';
import { useState } from 'react';
import { getSortedWakuwaku, wakuwakuSpeedMaster } from '../constants/wakuwakuMaster';

const SpeedTool = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [speed, setSpeed] = useState<number>(401.0);
  const [lowerLimit, setLowerLimit] = useState<number>(417.20);
  const [upperLimit, setUpperLimit] = useState<number>(421.93);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handleLowerLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowerLimit(parseFloat(e.target.value));
  };

  const handleUpperLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpperLimit(parseFloat(e.target.value));
  };

  const isInSpeedRange = (speed: number, range: [number, number] = [lowerLimit, upperLimit]) => {
    return range[0] <= speed && speed <= range[1];
  };

  const adjustSpeed = (inputSpeed: number) => {
    const wakuwakuMaster = wakuwakuSpeedMaster;
    const patterns = {
      count1: [],
      count2: [],
      count3: [],
      count4: [],
      count5: [],
    };
    const checkedPatterns = new Set<string>();

    const generatePatternString = (keys: string[]) => keys.join("\n");

    const addPattern = (keys: string[], addSpeed: number) => {
      const addedSpeed = inputSpeed + addSpeed;
      if (isInSpeedRange(addedSpeed)) {
        const patternString = generatePatternString(keys);
        if (!checkedPatterns.has(patternString)) {
          checkedPatterns.add(patternString);
          patterns[`count${keys.length}`].push({
            wakuwakuList: patternString,
            totalValue: Math.round(addSpeed * 100) / 100,
            totalSpeed: Math.round(addedSpeed * 100) / 100,
          });
        }
      }
    };

    // 1つ
    for (const key1 in wakuwakuMaster) {
      for (const key2 in wakuwakuMaster[key1]) {
        const addSpeed = wakuwakuMaster[key1][key2];
        addPattern([`${key1} ${key2}(+${addSpeed})`], addSpeed);
      }
    }

    // 2つ
    for (const key1 in wakuwakuMaster) {
      for (const key2 in wakuwakuMaster[key1]) {
        for (const key3 in wakuwakuMaster) {
          for (const key4 in wakuwakuMaster[key3]) {
            if (key1 !== key3) {
              const addSpeed = wakuwakuMaster[key1][key2] + wakuwakuMaster[key3][key4];
              addPattern(
                [
                  `${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`,
                  `${key3} ${key4}(+${wakuwakuMaster[key3][key4]})`
                ],
                addSpeed
              );
            }
          }
        }
      }
    }

    // 3つから5つまで
    const recursivePatternSearch = (
      currentKeys: string[],
      currentSpeed: number,
      depth: number,
      usedKeys: Set<string>
    ) => {
      if (depth > 5) return;

      for (const key1 in wakuwakuMaster) {
        if (usedKeys.has(key1)) continue;

        for (const key2 in wakuwakuMaster[key1]) {
          const newKeys = [...currentKeys, `${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`];
          const newSpeed = currentSpeed + wakuwakuMaster[key1][key2];
          addPattern(newKeys, newSpeed);
          usedKeys.add(key1);
          recursivePatternSearch(newKeys, newSpeed, depth + 1, usedKeys);
          usedKeys.delete(key1);
        }
      }
    };

    // 初期呼び出し
    for (const key1 in wakuwakuMaster) {
      for (const key2 in wakuwakuMaster[key1]) {
        recursivePatternSearch(
          [`${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`],
          wakuwakuMaster[key1][key2],
          2,
          new Set([key1])
        );
      }
    }

    console.log(patterns);
    return patterns;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const pat = adjustSpeed(speed);
      setResults(pat);
      setIsLoading(false);
      setHasCalculated(true);
    }, 500); // 500ms delay to simulate loading
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

      <Button mt={4} colorScheme="blue" bg="blue.400" onClick={handleSubmit} type="submit" isLoading={isLoading}>
        計算する！
      </Button>

      <Button mt={4} ml={4} colorScheme="blue" bg="blue.400" onClick={onToggle} className="toggle-button">
        わくわくの実一覧表
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

      <Box mt={8} id="result">
        {isLoading ? (
          <VStack>
            <Spinner size="xl" />
            <Text>計算中...</Text>
          </VStack>
        ) : hasCalculated && (
          <>
            {Object.values(results).every((count) => count.length === 0) ? (
              <Text fontSize="lg" color="red.500" textAlign="center">
                {`${speed}kmは調整可能なパターンが見つかりませんでした`}
              </Text>
            ) : (
              Object.entries(results).map(([key, patterns]) =>
                patterns.map((pattern: any, index: number) => (
                  <Flex key={`${key}-${index}`} mb={4} p={3} borderWidth="1px" rounded="md" bg="gray.50" direction={{ base: "column", md: "row" }} spacing={4}>
                    <Box flex={1} pr={{ md: 4 }}>
                      <Text fontWeight="bold" fontSize="sm">
                        パターン {index + 1}:
                      </Text>
                      <Text whiteSpace="pre-line" fontSize="sm">
                        {pattern.wakuwakuList}
                      </Text>
                    </Box>
                    <Box flex={1} pl={{ md: 4 }}>
                      <Text fontWeight="bold" fontSize="sm">
                        合計: {pattern.totalValue} 増加
                      </Text>
                      <Text fontSize="sm">
                        スピード: {pattern.totalSpeed} km/h
                      </Text>
                    </Box>
                  </Flex>
                ))
              )
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SpeedTool;
