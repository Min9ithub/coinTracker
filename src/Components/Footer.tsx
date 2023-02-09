import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Toggle = styled.span`
  font-size: 50px;
  cursor: pointer;
`;

function Header() {
  const [isDark, setIsDark] = useState(true);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
    setIsDark((prev) => !prev);
  };
  return (
    <Container>
      <Toggle onClick={toggleDarkAtom}>
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </Toggle>
    </Container>
  );
}

export default Header;
