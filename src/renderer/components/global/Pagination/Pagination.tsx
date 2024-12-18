import React from "react";
import { Flex, Button, Text, Box } from "@chakra-ui/react";
import { FaArrowRightLong, FaArrowLeftLong  } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }: {
  currentPage: number,
  totalPages: number,
  onPrevious: () => void,
  onNext: () => void
}) => {
  return (
    <Flex align="center" justify="space-between" mt={4}>
      <Button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        variant="outline"
      >
        <FaArrowLeftLong />
      </Button>
      <Box>
        <Text>
          <strong>{currentPage}</strong> из <strong>{totalPages}</strong>
        </Text>
      </Box>
      <Button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        variant="outline"
      >
        <FaArrowRightLong />
      </Button>
    </Flex>
  );
};

export default Pagination;