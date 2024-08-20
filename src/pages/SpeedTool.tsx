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
  Checkbox,
  useDisclosure,
  Spinner,
  VStack,
  Text,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getSortedWakuwaku, wakuwakuSpeedMaster } from '../constants/wakuwakuMaster';
import { FiTrendingUp, FiRepeat, FiActivity } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { cookieManager } from '../lib/cookieManager';

const SpeedTool = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [speed, setSpeed] = useState<number>(401.0);
  const [lowerLimit, setLowerLimit] = useState<number>(417.2);
  const [upperLimit, setUpperLimit] = useState<number>(421.93);
  const [wakuwakuTypeCount, setWakuwakuTypeCount] = useState<number>(3);
  const [excludeEL, setExcludeEL] = useState<boolean>(false);  // デフォルトで無効
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [visibleResultsCount, setVisibleResultsCount] = useState<number>(10);  // デフォルトで10個表示

  useEffect(() => {
    const savedSpeed = cookieManager.getCookie('speed_tool_speed');
    const savedLowerLimit = cookieManager.getCookie('speed_tool_lowerLimit');
    const savedUpperLimit = cookieManager.getCookie('speed_tool_upperLimit');
    const savedWakuwakuTypeCount = cookieManager.getCookie('speed_tool_wakuwakuTypeCount');
    const savedExcludeEL = cookieManager.getCookie('speed_tool_excludeEL');

    if (savedSpeed) setSpeed(parseFloat(savedSpeed));
    if (savedLowerLimit) setLowerLimit(parseFloat(savedLowerLimit));
    if (savedUpperLimit) setUpperLimit(parseFloat(savedUpperLimit));
    if (savedWakuwakuTypeCount) setWakuwakuTypeCount(parseInt(savedWakuwakuTypeCount, 10));
    if (savedExcludeEL) setExcludeEL(savedExcludeEL === 'true');
  }, []);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSpeed(value);
    cookieManager.setCookie('speed_tool_speed', value.toString(), 14);
    setHasCalculated(false);
  };

  const handleLowerLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLowerLimit(value);
    cookieManager.setCookie('speed_tool_lowerLimit', value.toString(), 14);
  };

  const handleUpperLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUpperLimit(value);
    cookieManager.setCookie('speed_tool_upperLimit', value.toString(), 14);
  };

  const handleWakuwakuTypeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setWakuwakuTypeCount(value);
    cookieManager.setCookie('speed_tool_wakuwakuTypeCount', value.toString(), 14);
  };

  const handleExcludeELChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setExcludeEL(value);
    cookieManager.setCookie('speed_tool_excludeEL', value.toString(), 14);
    setHasCalculated(false);
  };

  const isInSpeedRange = (speed: number, range: [number, number] = [lowerLimit, upperLimit]) => {
    return range[0] <= speed && speed <= range[1];
  };

  const adjustSpeed = (inputSpeed: number, maxPatterns: number = Infinity) => {
    let filteredWakuwakuMaster = Object.entries(wakuwakuSpeedMaster)
      .flatMap(([category, effects]) =>
        Object.entries(effects).map(([effectName, effectValue]) => ({
          category,
          effectName,
          effectValue,
        }))
      )
      .sort((a, b) => b.effectValue - a.effectValue);

    if (!excludeEL) {
      filteredWakuwakuMaster = filteredWakuwakuMaster.filter(
        (item) => !item.effectName.includes('EL')
      );
    }

    const patterns: any[] = [];
    const checkedPatterns = new Set<string>();
    let patternCount = 0;

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
          if (patternCount >= maxPatterns) return patterns;
        }
      }
    };

    for (const { category, effectName, effectValue } of filteredWakuwakuMaster) {
      addPattern([`${category} ${effectName}(+${effectValue})`], effectValue);
      if (patternCount >= maxPatterns) return patterns;
    }

    const recursivePatternSearch = (
      currentKeys: string[],
      currentSpeed: number,
      depth: number,
      usedCategories: Set<string>
    ) => {
      if (depth > wakuwakuTypeCount || patternCount >= maxPatterns) return;

      for (const { category, effectName, effectValue } of filteredWakuwakuMaster) {
        if (usedCategories.has(category)) continue;

        const newKeys = [...currentKeys, `${category} ${effectName}(+${effectValue})`];
        const newSpeed = currentSpeed + effectValue;
        addPattern(newKeys, newSpeed);
        usedCategories.add(category);
        recursivePatternSearch(newKeys, newSpeed, depth + 1, usedCategories);
        usedCategories.delete(category);
        if (patternCount >= maxPatterns) return;
      }
    };

    for (const { category, effectName, effectValue } of filteredWakuwakuMaster) {
      recursivePatternSearch(
        [`${category} ${effectName}(+${effectValue})`],
        effectValue,
        2,
        new Set([category])
      );
      if (patternCount >= maxPatterns) return patterns;
    }

    return patterns;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setVisibleResultsCount(10);  // デフォルトで10個表示
    setTimeout(() => {
      const pat = adjustSpeed(speed, 10);
      setResults(pat);
      setIsLoading(false);
      setHasCalculated(true);
    }, 500);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const moreResults = adjustSpeed(speed, visibleResultsCount + 10);  // 追加で10個表示
      setResults(moreResults);
      setVisibleResultsCount(visibleResultsCount + 10);
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
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <Flex mt={4}>
        <FormControl isRequired mr={2}>
          <FormLabel fontWeight={600} htmlFor="lowerLimit">調整したいスピード(下限)</FormLabel>
          <Input 
            id="lowerLimit" 
            name="lowerLimit" 
            type="number" 
            step="0.01" 
            value={lowerLimit} 
            onChange={handleLowerLimitChange} 
            borderColor="gray.400"
            focusBorderColor="blue.400"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight={600} htmlFor="upperLimit">調整したいスピード(上限)</FormLabel>
          <Input 
            id="upperLimit" 
            name="upperLimit" 
            type="number" 
            step="0.01" 
            value={upperLimit} 
            onChange={handleUpperLimitChange} 
            borderColor="gray.400"
            focusBorderColor="blue.400"
          />
        </FormControl>
      </Flex>

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
          borderColor="gray.400"
          focusBorderColor="blue.400"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center" mt={4}>
        <Checkbox
          id="excludeEL"
          name="excludeEL"
          isChecked={excludeEL}
          onChange={handleExcludeELChange}
          colorScheme="blue"  // チェック時の色を青に設定
          borderColor="gray.400"  // チェックボックスの境界線を明確にする
        >
          <Text as="span" fontWeight="bold">
            ELミンを使う
          </Text>
        </Checkbox>
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
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {results.map((pattern, index: number) => (
                  <Box
                    key={index}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    shadow="md"
                    bg="white"
                  >
                    <GridItem>
                      <HStack>
                        <Icon as={FiActivity} color="green.500" boxSize={6} />
                        <Text fontSize="xl" fontWeight="bold" color="green.600">パターン {index + 1}</Text>
                      </HStack>
                      <Text mt={2} fontSize="md" fontWeight="bold" whiteSpace="pre-line">{pattern.wakuwakuList}</Text>
                      <HStack mt={4}>
                        <Icon as={FiRepeat} color="blue.500" boxSize={6} />
                        <Text fontSize="xl" fontWeight="bold" color="blue.700">合計: {pattern.totalValue} 増加</Text>
                      </HStack>
                      <HStack mt={2}>
                        <Icon as={FiTrendingUp} color="red.500" boxSize={6} />
                        <Text fontSize="xl" fontWeight="bold" color="red.700">スピード: {pattern.totalSpeed} km/h</Text>
                      </HStack>
                    </GridItem>
                  </Box>
                ))}
              </SimpleGrid>
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
