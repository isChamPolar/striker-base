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

const ExpCalculator = () => {
  const [currentRank, setCurrentRank] = useState<number>(1500);
  const [currentExp, setCurrentExp] = useState<number>(calculateExp(1500));
  const [targetRank, setTargetRank] = useState<number>(2000);
  const [targetExp, setTargetExp] = useState<number>(calculateExp(2000));
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

  const findRankByExp = (exp: number): number | null => {
    const maxRankInTable = 2000;
    const additionalExpPerRank = 4330881;

    const rank = Object.keys(rankTable).find(
      (key) => rankTable[parseInt(key)] > exp
    );

    if (rank) {
      return parseInt(rank) - 1;
    } else {
      const excessExp = exp - rankTable[maxRankInTable];
      const additionalRanks = Math.floor(excessExp / additionalExpPerRank);
      return maxRankInTable + additionalRanks;
    }
  };

  const handleCurrentRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rank = parseInt(e.target.value);
    setCurrentRank(rank);
    setCurrentExp(calculateExp(rank));
  };

  const handleTargetRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rank = parseInt(e.target.value);
    setTargetRank(rank);
    setTargetExp(calculateExp(rank));
  };

  const handleCurrentExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = parseInt(e.target.value);
    setCurrentExp(exp);
  };

  const handleTargetExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = parseInt(e.target.value);
    setTargetExp(exp);
  };

  const handleCurrentExpBlur = () => {
    setCurrentRank(findRankByExp(currentExp));
  };

  const handleTargetExpBlur = () => {
    setTargetRank(findRankByExp(targetExp));
  };

  const validateTargetDate = (): boolean => {
    const today = new Date();
    const target = new Date(targetYear, targetMonth - 1, targetDay);

    if (target <= today) {
      toast({
        title: 'エラー',
        description: '目標年月日は未来の日付を選択してください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (validateTargetDate()) {
      const today = new Date();
      const target = new Date(targetYear, targetMonth - 1, targetDay);
      const diffTime = Math.abs(target.getTime() - today.getTime());
      setRemainingDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
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
    if (!validateTargetDate()) return;
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

      <Flex justify="space-between" mb={4}>
        <FormControl isRequired width="48%">
          <FormLabel fontWeight={600} htmlFor="targetRank">目標のランク</FormLabel>
          <Input
            id="targetRank"
            name="targetRank"
            type="number"
            step="1"
            value={targetRank ?? ''}
            placeholder="例: 2100"
            onChange={handleTargetRankChange}
            borderColor="gray.400"
            focusBorderColor="blue.400"
          />
        </FormControl>

        <FormControl isRequired width="48%">
          <FormLabel fontWeight={600} htmlFor="targetExp">目標の経験値</FormLabel>
          <Input
            id="targetExp"
            name="targetExp"
            type="number"
            step="1"
            value={targetExp || ''}
            placeholder="例: 10000000"
            onChange={handleTargetExpChange}
            onBlur={handleTargetExpBlur}
            borderColor="gray.400"
            focusBorderColor="blue.400"
          />
        </FormControl>
      </Flex>

      <Flex justify="space-between" mb={4}>
        <FormControl isRequired width="48%">
          <FormLabel fontWeight={600} htmlFor="currentRank">現在のランク</FormLabel>
          <Input
            id="currentRank"
            name="currentRank"
            type="number"
            step="1"
            value={currentRank || ''}
            placeholder="例: 1500"
            onChange={handleCurrentRankChange}
            borderColor="gray.400"
            focusBorderColor="blue.400"
          />
        </FormControl>

        <FormControl isRequired width="48%">
          <FormLabel fontWeight={600} htmlFor="currentExp">現在の経験値</FormLabel>
          <Input
            id="currentExp"
            name="currentExp"
            type="number"
            step="1"
            value={currentExp || ''}
            placeholder="例: 5000000"
            onChange={handleCurrentExpChange}
            onBlur={handleCurrentExpBlur}
            borderColor="gray.400"
            focusBorderColor="blue.400"
          />
        </FormControl>
      </Flex>
      <Text as="span" color="red.500" fontSize="xs">
        ※2000以降では1ランクあたり4330881として計算します。
      </Text>
      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600}>目標年月日</FormLabel>
        <Flex align="center">
          <FormControl mr={2}>
            <FormLabel>年</FormLabel>
            <Input
              id="targetYear"
              name="targetYear"
              type="number"
              placeholder="例: 2024"
              value={targetYear || ''}
              onChange={(e) => setTargetYear(parseInt(e.target.value))}
              borderColor="gray.400"
              focusBorderColor="blue.400"
            />
          </FormControl>
          <FormControl mr={2}>
            <FormLabel>月</FormLabel>
            <Input
              id="targetMonth"
              name="targetMonth"
              type="number"
              placeholder="例: 12"
              value={targetMonth || ''}
              onChange={(e) => setTargetMonth(parseInt(e.target.value))}
              borderColor="gray.400"
              focusBorderColor="blue.400"
            />
          </FormControl>
          <FormControl>
            <FormLabel>日</FormLabel>
            <Input
              id="targetDay"
              name="targetDay"
              type="number"
              placeholder="例: 25"
              value={targetDay || ''}
              onChange={(e) => setTargetDay(parseInt(e.target.value))}
              borderColor="gray.400"
              focusBorderColor="blue.400"
            />
          </FormControl>
        </Flex>
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="lapsPerHour">1時間あたりの周回数</FormLabel>
        <Input
          id="lapsPerHour"
          name="lapsPerHour"
          type="number"
          step="1"
          value={lapsPerHour || ''}
          placeholder="例: 60"
          onChange={(e) => setLapsPerHour(parseInt(e.target.value))}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
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
          placeholder="例: 25000"
          value={lapExp || ''}
          onChange={(e) => setLapExp(parseInt(e.target.value))}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
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
          <option value="1.65">特級EL (1.65)</option>
          <option value="1.6">特級L (1.60)</option>
          <option value="1.55">特級M (1.55)</option>
          <option value="1.5">特級 (1.50)</option>
          <option value="1.0">なし</option>
        </Select>
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
