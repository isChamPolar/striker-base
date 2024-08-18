import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  VStack,
  Text,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { FiBarChart2, FiZap, FiClock, FiTarget, FiTrendingUp, FiActivity, FiRepeat, FiShare } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { rankTable } from '../constants/rankTable';
import { Helmet } from 'react-helmet-async';

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
  const [expMultiplier, setExpMultiplier] = useState<string>('3');
  const [learningPower, setLearningPower] = useState<string>('1.75');
  const [monpassMultiplier, setMonpassMultiplier] = useState<string>('1.0');
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [requiredExp, setRequiredExp] = useState<number>(0);
  const [result, setResult] = useState<{
    finalExpMultiplier: number;
    expPerLap: number;
    lapsPerDay: number;
    totalLaps: number;
    hoursPerDay: number;
    totalHours: number;
    expPerHour: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string | null>(null);
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
    const target = new Date(targetYear, targetMonth - 1, targetDay);

    if (targetYear < 1900 || targetYear > 2200) {
      setDateError('年は1900～2200の間で入力してください。');
      return false;
    }
    if (targetMonth < 1 || targetMonth > 12) {
      setDateError('月は1～12の間で入力してください。');
      return false;
    }
    const lastDayOfMonth = new Date(targetYear, targetMonth, 0).getDate();
    if (targetDay < 1 || targetDay > lastDayOfMonth) {
      setDateError(`日付は1～${lastDayOfMonth}の間で入力してください。`);
      return false;
    }

    const today = new Date();
    if (target <= today) {
      setDateError('目標年月日は未来の日付を選択してください。');
      return false;
    }

    setDateError(null);
    return true;
  };

  const handleTargetDateBlur = () => {
    validateTargetDate();
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
    const finalExpMultiplier =
      parseFloat(expMultiplier) *
      parseFloat(learningPower) *
      parseFloat(learningLevel) * 
      parseFloat(monpassMultiplier);
    const expPerLap = lapExp * finalExpMultiplier;
    const totalLaps = requiredExp / expPerLap;
    const lapsPerDay = totalLaps / remainingDays;
    const hoursPerDay = lapsPerDay / lapsPerHour;
    const totalHours = totalLaps / lapsPerHour;
    const expPerHour = expPerLap * lapsPerHour;

    return {
      finalExpMultiplier: finalExpMultiplier.toFixed(3),
      expPerLap,
      lapsPerDay: Math.ceil(lapsPerDay),
      totalLaps: Math.ceil(totalLaps),
      hoursPerDay: hoursPerDay.toFixed(2),
      totalHours: totalHours.toFixed(2),
      expPerHour: expPerHour.toFixed(0),
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
      setResult(result);
      setIsLoading(false);
      setHasCalculated(true);
    }, 500);
  };

  const handlePostToX = () => {
    if (!result) return;

    const tweetText = encodeURIComponent(`
#STRIKERBASE
ランク ${currentRank} からランク ${targetRank} に上げるための必要な経験値は ${requiredExp.toLocaleString()} です！
1周あたりの経験値は ${result.expPerLap.toLocaleString()}
1日あたりの周回数は ${result.lapsPerDay.toLocaleString()} 周で、1日あたりの周回時間は ${result.hoursPerDay} 時間です！
詳しくは ${window.location.href} でチェック！
`);

    const tweetUrl = `https://x.com/intent/tweet?text=${tweetText}`;

    window.open(tweetUrl, "_blank");
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
      <Helmet>
        <title>ランク計算ツール | STRIKER BASE - モンスト便利ツール</title>
        <meta name="description" content="ランク上げに必須！目標までの道のりをチェック！" />
        <meta property="og:title" content="ランク計算ツール | STRIKER BASE - モンスト便利ツール" />
        <meta property="og:description" content="目標ランクを入力！必要な経験値を計算できる便利ツール！" />
        <meta property="og:image" content="https://striker-base.com/og-image.png" />
        <meta property="og:url" content="https://striker-base.com/exp-calculator" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://striker-base.com/og-image.png" />
      </Helmet>
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
        ※2000以降のランクでは1ランクあたりに必要な経験値を4330881として計算します。
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
              onBlur={handleTargetDateBlur}
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
              onBlur={handleTargetDateBlur}
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
              onBlur={handleTargetDateBlur}
              borderColor="gray.400"
              focusBorderColor="blue.400"
            />
          </FormControl>
        </Flex>
        {dateError && (
          <Text color="red.500" fontSize="sm" mt={2}>
            {dateError}
          </Text>
        )}
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
        <FormLabel fontWeight={600} htmlFor="expMultiplier">経験値倍率</FormLabel>
        <Select
          id="expMultiplier"
          name="expMultiplier"
          value={expMultiplier}
          onChange={(e) => setExpMultiplier(e.target.value)}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        >
          <option value="3">エラベルベル(3倍)</option>
          <option value="2">経験値2倍イベント(2倍)</option>
          <option value="1">等倍</option>
        </Select>
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="learningPower">学びのパワー</FormLabel>
        <Select
          id="learningPower"
          name="learningPower"
          value={learningPower}
          onChange={(e) => setLearningPower(e.target.value)}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        >
          <option value="1.75">メイン 学びスポット+(75%UP)</option>
          <option value="1.5">メイン 学びスポット(50%UP)</option>
          <option value="1.5">サブ 学びスポット+(50%UP)</option>
          <option value="1.25">サブ 学びスポット(25%UP)</option>
          <option value="1.0">学びスポットなし</option>
        </Select>
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

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="monpassMultiplier">モンパス会員 マルチプレイ</FormLabel>
        <Select
          id="monpassMultiplier"
          name="monpassMultiplier"
          value={monpassMultiplier}
          onChange={(e) => setMonpassMultiplier(e.target.value)}
          borderColor="gray.400"
          focusBorderColor="blue.400"
        >
          <option value="1.05">有効(5%UP)</option>
          <option value="1.0">無効</option>
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
        ) : hasCalculated && result !== null && (
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                shadow="md"
                bg="white"
              >
                <GridItem>
                  <HStack>
                    <Icon as={FiActivity} color="purple.500" boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold" color="purple.600">必要な経験値</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.700">{requiredExp.toLocaleString()}</Text>
                </GridItem>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                shadow="md"
                bg="white"
              >
                <GridItem>
                  <HStack>
                    <Icon as={FiTrendingUp} color="teal.500" boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold" color="teal.600">経験値倍率</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.700">{result.finalExpMultiplier} 倍</Text>
                </GridItem>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                shadow="md"
                bg="white"
              >
                <GridItem>
                  <HStack>
                    <Icon as={FiZap} color="yellow.500" boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold" color="yellow.600">1周あたりの経験値</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="yellow.700">{result.expPerLap.toLocaleString()}</Text>
                </GridItem>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                shadow="md"
                bg="white"
              >
                <GridItem>
                  <HStack>
                    <Icon as={FiRepeat} color="green.500" boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold" color="green.600">1日あたりの周回数</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="green.700">{result.lapsPerDay.toLocaleString()} 周</Text>
                </GridItem>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                shadow="md"
                bg="white"
              >
                <GridItem>
                  <HStack>
                    <Icon as={FiClock} color="blue.500" boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold" color="blue.600">1日あたりの周回時間</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.700">{result.hoursPerDay} h</Text>
                </GridItem>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                shadow="md"
                bg="white"
              >
                <GridItem>
                  <HStack>
                    <Icon as={FiTarget} color="red.500" boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold" color="red.600">目標経験値までの周回数</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="red.700">{result.totalLaps.toLocaleString()} 周</Text>
                </GridItem>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                shadow="md"
                bg="white"
              >
                <GridItem>
                  <HStack>
                    <Icon as={FiClock} color="orange.500" boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold" color="orange.600">目標経験値までの周回時間</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="orange.700">{result.totalHours} h</Text>
                </GridItem>
              </Box>
            </SimpleGrid>
          </>
        )}
      </Box>

      {hasCalculated && (
        <Button
         mt={6}
         bg="black"
         type="submit"
         color="white"
         leftIcon={<Icon as={FiShare} />}
         onClick={handlePostToX}
        >
        Xにポストする
        </Button>
      )}
    </Box>
  );
};

export default ExpCalculator;
