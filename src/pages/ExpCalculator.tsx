import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  useDisclosure,
  Spinner,
  VStack,
  Text,
  Flex,
  HStack,
  Icon
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiBarChart2 } from 'react-icons/fi';  // アイコンのインポート

const ExpCalculator = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [currentExp, setCurrentExp] = useState<number>(0);  // 現在の経験値
  const [targetExp, setTargetExp] = useState<number>(0);  // 目標経験値
  const [results, setResults] = useState<number | null>(null);  // 計算結果を保持
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const handleCurrentExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasCalculated(false);
    setCurrentExp(parseFloat(e.target.value));
  };

  const handleTargetExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetExp(parseFloat(e.target.value));
  };

  const calculateExp = () => {
    const requiredExp = targetExp - currentExp;
    return requiredExp > 0 ? requiredExp : 0;  // 必要経験値を計算
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const result = calculateExp();
      setResults(result);
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
        <FormLabel fontWeight={600} htmlFor="currentExp">現在の経験値</FormLabel>
        <Input 
          id="currentExp" 
          name="currentExp" 
          type="number" 
          step="1" 
          value={currentExp ?? ''} 
          onChange={handleCurrentExpChange} 
          borderColor="gray.400"  // フォームの枠線の色を設定
          focusBorderColor="blue.400"  // フォーカス時の枠線の色を設定
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
          borderColor="gray.400"  // フォームの枠線の色を設定
          focusBorderColor="blue.400"  // フォーカス時の枠線の色を設定
        />
      </FormControl>

      <Button mt={4} colorScheme="blue" bg="blue.400" onClick={handleSubmit} type="submit" isLoading={isLoading} color="white">
        計算する！
      </Button>

      <Box mt={8} id="result">
        {isLoading ? (
          <VStack>
            <Spinner size="xl" />
            <Text>計算中...</Text>
          </VStack>
        ) : hasCalculated && results !== null && (
          <Text fontSize="lg" color="blue.500" textAlign="center">
            必要な経験値: {results}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ExpCalculator;
