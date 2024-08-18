import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useDisclosure,
  Spinner,
  VStack,
  Text,
  Flex,
  HStack,
  Icon,
  Table,
  Tbody,
  Tr,
  Td,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import { rankTable } from '../constants/rankTable';

const ExpCalculator = () => {
  const [currentRank, setCurrentRank] = useState<number | null>(null);
  const [currentExp, setCurrentExp] = useState<number>(0);
  const [targetRank, setTargetRank] = useState<number | null>(null);
  const [targetExp, setTargetExp] = useState<number>(0);
  const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
  const [targetMonth, setTargetMonth] = useState<number>(new Date().getMonth() + 1);
  const [targetDay, setTargetDay] = useState<number>(new Date().getDate() + 1);
  const [learningLevel, setLearningLevel] = useState<string>('1.65');
  const [lapExp, setLapExp] = useState<number>(20000);
  const [lapsPerHour, setLapsPerHour] = useState<number>(60);
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [requiredExp, setRequiredExp] = useState<number>(0);
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const toast = useToast();

  const calculateExp = (rank: number): number => {
    const maxRankInTable = 2000;
    const additionalExpPerRank = 4330881;

    if (rank <= maxRankInTable) {
      return rankTable[rank] ?? 0;
    } else {
      const additionalRanks = rank - maxRankInTable;
      return rankTable[maxRankInTable] + additionalRanks * additionalExpPerRank;
    }
  };

  useEffect(() => {
    if (currentRank !== null) {
      const exp = calculateExp(currentRank);
      setCurrentExp(exp);
    }
  }, [currentRank]);

  useEffect(() => {
    if (targetRank !== null) {
      const exp = calculateExp(targetRank);
      setTargetExp(exp);
    }
  }, [targetRank]);

  const handleCurrentExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = parseInt(e.target.value);
    setCurrentExp(exp);
    const rank = Object.keys(rankTable).find(
      (key) => rankTable[parseInt(key)] > exp
    );
    if (rank) setCurrentRank(parseInt(rank) - 1);
  };

  const handleTargetExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = parseInt(e.target.value);
    setTargetExp(exp);
    const rank = Object.keys(rankTable).find(
      (key) => rankTable[parseInt(key)] > exp
    );
    if (rank) setTargetRank(parseInt(rank) - 1);
  };

  useEffect(() => {
    const today = new Date();
    const target = new Date(targetYear, targetMonth - 1, targetDay);
    const diffTime = Math.abs(target.getTime() - today.getTime());
    setRemainingDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [targetYear, targetMonth, targetDay]);

  useEffect(() => {
    const expDiff = targetExp - currentExp;
    setRequiredExp(expDiff > 0 ? expDiff : 0);
  }, [targetExp, currentExp]);

  const calculateResults = () => {
    const expMultiplier = parseFloat(learningLevel);
    const totalExpPerLap = lapExp * expMultiplier;
    const totalLaps = requiredExp / totalExpPerLap;
    const lapsPerDay = totalLaps / remainingDays;
    const hoursPerDay = lapsPerDay / lapsPerHour;
    const totalHours = totalLaps / lapsPerHour;

    return {
      totalLaps,
      lapsPerDay,
      hoursPerDay,
      totalHours,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requiredExp <= 0) {
      toast({
        title: 'エラー',
        description: '目標経験値が現在の経験値以下です。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const result = calculateResults();
      setResults(result);
      setIsLoading(false);
      setHasCalculated(true);
    }, 500);
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
      <HStack alignItems="center" mb={5}>
        <Icon as={FiBarChart2} boxSize={8} color="blue.400" />
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          lineHeight={{ base: '160%', sm: '150%' }}
          ml={2}
        >
          ランク計算ツール
        </Heading>
      </HStack>

      <FormControl isRequired>
        <FormLabel fontWeight={600} htmlFor="currentRank">現在のランク</FormLabel>
        <Input
          id="currentRank"
          name="currentRank"
          type="number"
          step="1"
          value={currentRank ?? ''}
          onChange={(e) => setCurrentRank(parseInt(e.target.value))}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="currentExp">現在の経験値</FormLabel>
        <Input
          id="currentExp"
          name="currentExp"
          type="number"
          step="1"
          value={currentExp}
          onChange={handleCurrentExpChange}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="targetRank">目標のランク</FormLabel>
        <Input
          id="targetRank"
          name="targetRank"
          type="number"
          step="1"
          value={targetRank ?? ''}
          onChange={(e) => setTargetRank(parseInt(e.target.value))}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="targetExp">目標の経験値</FormLabel>
        <Input
          id="targetExp"
          name="targetExp"
          type="number"
          step="1"
          value={targetExp}
          onChange={handleTargetExpChange}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600}>目標年月日</FormLabel>
        <Flex>
          <Input
            id="targetYear"
            name="targetYear"
            type="number"
            placeholder="年"
            value={targetYear}
            onChange={(e) => setTargetYear(parseInt(e.target.value))}
            borderColor="gray.400"
            focusBorderColor="blue.400"
            mr={2}
          />
          <Input
            id="targetMonth"
            name="targetMonth"
            type="number"
            placeholder="月"
            value={targetMonth}
            onChange={(e) => setTargetMonth(parseInt(e.target.value))}
            borderColor="gray.400"
            focusBorderColor="blue.400"
            mr={2}
          />
          <Input
            id="targetDay"
            name="targetDay"
            type="number"
            placeholder="日"
            value={targetDay}
            onChange={(e) => setTargetDay(parseInt(e.target.value))}
            borderColor="gray.400"
            focusBorderColor="blue.400"
          />
        </Flex>
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="learningLevel">学びの力 等級</FormLabel>
        <Select
          id="learningLevel"
          name="learningLevel"
          value={learningLevel}
          onChange={(e) => setLearningLevel(e.target.value)}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        >
          <option value="1.65">EL (1.65)</option>
          <option value="1.6">L (1.60)</option>
        </Select>
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="lapExp">1周あたりの経験値</FormLabel>
        <Select
          id="lapExp"
          name="lapExp"
          value={lapExp}
          onChange={(e) => setLapExp(parseInt(e.target.value))}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        >
          <option value={20000}>魔境シリーズ (20,000)</option>
          <option value={15000}>険所シリーズ (15,000)</option>
        </Select>
        <Input
          mt={2}
          type="number"
          step="1"
          value={lapExp}
          onChange={(e) => setLapExp(parseInt(e.target.value))}
          placeholder="その他の数値"
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="lapsPerHour">1時間あたりの周回数</FormLabel>
        <Input
          id="lapsPerHour"
          name="lapsPerHour"
          type="number"
          step="1"
          value={lapsPerHour}
          onChange={(e) => setLapsPerHour(parseInt(e.target.value))}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <Button mt={6} colorScheme="blue" bg="blue.400" onClick={handleSubmit} type="submit" isLoading={isLoading} color="white">
        計算する！
      </Button>

      <Box mt={8} id="result">
        {isLoading ? (
          <VStack>
            <Spinner size="xl" />
            <Text>計算中...</Text>
          </VStack>
        ) : hasCalculated && results !== null && (
          <>
            <Text fontSize="lg" color="blue.500" textAlign="center" mb={4}>
              必要な経験値: {requiredExp}
            </Text>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>周回方法</Td>
                  <Td>{lapExp}</Td>
                </Tr>
                <Tr>
                  <Td>1周あたりの経験値</Td>
                  <Td>{lapExp * parseFloat(learningLevel)}</Td>
                </Tr>
                <Tr>
                  <Td>1日分</Td>
                  <Td>{Math.ceil(results.lapsPerDay)}</Td>
                </Tr>
                <Tr>
                  <Td>目標まで</Td>
                  <Td>{Math.ceil(results.totalLaps)}</Td>
                </Tr>
                <Tr>
                  <Td>1日あたり何時間</Td>
                  <Td>{results.hoursPerDay.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>目標まで何時間</Td>
                  <Td>{results.totalHours.toFixed(2)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ExpCalculator;
