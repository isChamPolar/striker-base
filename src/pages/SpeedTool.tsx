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
  Text,
  Flex,
  HStack,
  Icon
} from '@chakra-ui/react';
import { useState } from 'react';
import { getSortedWakuwaku, wakuwakuSpeedMaster } from '../constants/wakuwakuMaster';
import { FiTrendingUp } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

const SpeedTool = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [speed, setSpeed] = useState<number>(401.0);
  const [lowerLimit, setLowerLimit] = useState<number>(417.20);
  const [upperLimit, setUpperLimit] = useState<number>(421.93);
  const [wakuwakuTypeCount, setWakuwakuTypeCount] = useState<number>(3); // わくわくの実の種類数
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [visibleResultsCount, setVisibleResultsCount] = useState<number>(5); // 表示する結果の数

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasCalculated(false);
    setSpeed(parseFloat(e.target.value));
  };

  const handleLowerLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowerLimit(parseFloat(e.target.value));
  };

  const handleUpperLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpperLimit(parseFloat(e.target.value));
  };

  const handleWakuwakuTypeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWakuwakuTypeCount(parseInt(e.target.value, 10));
  };

  const isInSpeedRange = (speed: number, range: [number, number] = [lowerLimit, upperLimit]) => {
    return range[0] <= speed && speed <= range[1];
  };

  const adjustSpeed = (inputSpeed: number, maxPatterns: number = Infinity) => {
    const wakuwakuMaster = wakuwakuSpeedMaster;
    const patterns = []; // 結果を保持する配列に変更
    const checkedPatterns = new Set<string>();
    let patternCount = 0; // パターンカウント

    const generatePatternString = (keys: string[]) => keys.join("\n");

    const addPattern = (keys: string[], addSpeed: number) => {
      const addedSpeed = inputSpeed + addSpeed;
      if (isInSpeedRange(addedSpeed)) {
        const patternString = generatePatternString(keys);
        if (!checkedPatterns.has(patternString)) {
          checkedPatterns.add(patternString);
          patterns.push({
            wakuwakuList: patternString,
            totalValue: Math.round(addSpeed * 100) / 100,
            totalSpeed: Math.round(addedSpeed * 100) / 100,
          });
          patternCount++;
          if (patternCount >= maxPatterns) return patterns; // 最大パターン数に達したら停止
        }
      }
    };

    // 1つ
    for (const key1 in wakuwakuMaster) {
      for (const key2 in wakuwakuMaster[key1]) {
        const addSpeed = wakuwakuMaster[key1][key2];
        addPattern([`${key1} ${key2}(+${addSpeed})`], addSpeed);
        if (patternCount >= maxPatterns) return patterns;
      }
    }

    // 2つ以上の組み合わせ
    const recursivePatternSearch = (
      currentKeys: string[],
      currentSpeed: number,
      depth: number,
      usedKeys: Set<string>
    ) => {
      if (depth > wakuwakuTypeCount || patternCount >= maxPatterns) return;

      for (const key1 in wakuwakuMaster) {
        if (usedKeys.has(key1)) continue;

        for (const key2 in wakuwakuMaster[key1]) {
          const newKeys = [...currentKeys, `${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`];
          const newSpeed = currentSpeed + wakuwakuMaster[key1][key2];
          addPattern(newKeys, newSpeed);
          usedKeys.add(key1);
          recursivePatternSearch(newKeys, newSpeed, depth + 1, usedKeys);
          usedKeys.delete(key1);
          if (patternCount >= maxPatterns) return;
        }
      }
    };

    for (const key1 in wakuwakuMaster) {
      for (const key2 in wakuwakuMaster[key1]) {
        recursivePatternSearch(
          [`${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`],
          wakuwakuMaster[key1][key2],
          2,
          new Set([key1])
        );
        if (patternCount >= maxPatterns) return patterns;
      }
    }

    return patterns; // オブジェクトではなく、単一の配列として結果を返す
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setVisibleResultsCount(5); // 表示する結果の数をリセット
    setTimeout(() => {
      const pat = adjustSpeed(speed, 5);
      setResults(pat);
      setIsLoading(false);
      setHasCalculated(true);
    }, 500); // 500ms delay to simulate loading
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const moreResults = adjustSpeed(speed, visibleResultsCount + 5); // 追加で5つ計算
      setResults(moreResults);
      setVisibleResultsCount(visibleResultsCount + 5);
      setIsLoading(false);
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
    <Helmet>
        <title>スピード調整ツール | STRIKER BASE - モンスト便利ツール</title>
        <meta name="description" content="周回の効率アップ！どのわくわくの実をどれだけ付ければOKかすぐわかる！" />
        <meta property="og:title" content="スピード調整ツール | STRIKER BASE - モンスト便利ツール" />
        <meta property="og:description" content="今のスピードを入力して、どのわくわくの実をどれだけ付ければOKかすぐわかる！" />
        <meta property="og:image" content="https://striker-base.com/og-image.png" />
        <meta property="og:url" content="https://striker-base.com/speed-tool" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://striker-base.com/og-image.png" />
    </Helmet>
    <HStack alignItems="center" mb={5}>
      <Icon as={FiTrendingUp} boxSize={8} color="blue.400" />
      <Heading
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        lineHeight={{ base: '160%', sm: '150%' }}
        ml={2}
      >
        スピード調整ツール
      </Heading>
    </HStack>

      <FormControl isRequired>
        <FormLabel fontWeight={600} htmlFor="speed">現在のスピード</FormLabel>
        <Input 
          id="speed" 
          name="speed" 
          type="number" 
          step="0.01" 
          value={speed ?? ''} 
          onChange={handleSpeedChange} 
          borderColor="gray.400"  // フォームの枠線の色を設定
          focusBorderColor="blue.400"  // フォーカス時の枠線の色を設定
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
          borderColor="gray.400"  // フォームの枠線の色を設定
          focusBorderColor="blue.400"  // フォーカス時の枠線の色を設定
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
          borderColor="gray.400"  // フォームの枠線の色を設定
          focusBorderColor="blue.400"  // フォーカス時の枠線の色を設定
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel fontWeight={600} htmlFor="wakuwakuTypeCount">
          わくわくの実の種類数(上限)
        </FormLabel>
        <Text as="span" color="red.500" fontSize="xs">
            ※1〜6の値を指定できます。種類を増やすと計算に時間がかかる場合があります）
        </Text>
        <Input 
          id="wakuwakuTypeCount" 
          name="wakuwakuTypeCount" 
          type="number" 
          step="1" 
          min={1}
          max={6}
          value={wakuwakuTypeCount} 
          onChange={handleWakuwakuTypeCountChange} 
          borderColor="gray.400"  // フォームの枠線の色を設定
          focusBorderColor="blue.400"  // フォーカス時の枠線の色を設定
        />
      </FormControl>

      <Button mt={4} colorScheme="blue" bg="blue.400" onClick={handleSubmit} type="submit" isLoading={isLoading} color="white">
        計算する！
      </Button>

      <Button mt={4} ml={4} colorScheme="blue" bg="blue.400" onClick={onToggle} className="toggle-button" color="white">
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
            {results.length === 0 ? (
              <Text fontSize="lg" color="red.500" textAlign="center">
                {`${speed}kmは調整可能なパターンが見つかりませんでした`}
              </Text>
            ) : (
              results.map((pattern, index: number) => (
                <Flex key={index} mb={4} p={3} borderWidth="1px" rounded="md" bg="gray.50" direction={{ base: "column", md: "row" }} spacing={4}>
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
            )}
            {results.length >= visibleResultsCount && (
              <Button mt={4} colorScheme="blue" bg="blue.400" onClick={handleLoadMore}>
                さらに計算する
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SpeedTool;
