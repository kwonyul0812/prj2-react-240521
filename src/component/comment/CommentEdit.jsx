import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import axios from "axios";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        toast({
          status: "success",
          description: "댓글 수정 되었습니다.",
          position: "top",
        });
        setIsEditing(false);
        setIsProcessing(false);
      });
  }

  return (
    <Box>
      <Flex>
        <Box flex={1}>
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            variant="outline"
            colorScheme={"gray"}
            onClick={() => setIsEditing(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button
            onClick={onOpen}
            variant="outline"
            colorSchme={"blue"}
            isLoading={isProcessing}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>댓글수정 확인</ModalHeader>
          <ModalBody>댓글수정 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              isLoading={isProcessing}
              colorScheme={"blue"}
              onClick={handleCommentSubmit}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
