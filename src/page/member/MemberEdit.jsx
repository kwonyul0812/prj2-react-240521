import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const { id } = useParams();
  const [nickName, setNickName] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 정보 조회 중 문제가 발생하였습니다.",
          position: "top",
        });
        navigate("/");
      });
  }, []);

  function handleClickSave() {
    axios
      .put("/api/member/modify", { ...member, oldPassword })
      .then((res) => {})
      .then(() => {})
      .finally(() => {});
  }

  function handleCheckNinckName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then(() => {
        toast({
          status: "warning",
          description: "사용 불가능한 닉네임 입니다.",
          position: "top",
        });
        setIsCheckedNickName(false);
      })
      .catch((err) => {
        if (err.response.status == 404) {
          toast({
            status: "info",
            description: "사용 가능한 닉네임 입니다.",
            position: "top",
          });
          setIsCheckedNickName(true);
        }
      })
      .finally();
  }

  if (member === null) {
    return <Spinner />;
  }

  const isCheckedPassword = password === passwordCheck;

  let isDisabled = false;

  if (!isCheckedNickName) {
    isDisabled = true;
  }

  if (!isCheckedPassword) {
    isDisabled = true;
  }

  return (
    <Box>
      <Box>회원 정보 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input readOnly value={member.email}></Input>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>암호</FormLabel>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
              setMember({ ...member, password: password });
            }}
            placeholder={"암호를 변경하려면 입력하세요"}
          />
          <FormHelperText>
            입력하지 않으면 기존 암호를 변경하지 않습니다.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>암호 확인</FormLabel>
          <Input onChange={(e) => setPasswordCheck(e.target.value)} />
          {isCheckedPassword || (
            <FormHelperText>비밀번호가 일치하지 않습니다.</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>별명</FormControl>
        <InputGroup>
          <Input
            onChange={(e) => {
              setNickName(e.target.value.trim());
              setMember({ ...member, nickName: nickName });
            }}
          />
          <InputRightElement w={"75px"} mr={1}>
            <Button
              isDisabled={nickName.length === 0}
              onClick={handleCheckNinckName}
              size={"sm"}
            >
              중복확인
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box>
        <Button isDisabled={isDisabled} onClick={onOpen} colorScheme={"blue"}>
          저장
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>기존 암호 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>기존 암호</FormLabel>
              <Input onChange={(e) => setOldPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleClickSave} colorScheme={"blue"}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
