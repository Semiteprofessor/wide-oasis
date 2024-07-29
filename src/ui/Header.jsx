import styled from "styled-components"

const StyleHeader = styled.header`
  background-color: var(--color-gray-0);
`;

const Header = () => {
  return (
    <StyleHeader>
        <UserAvatar />
        <HeaderMenu />
    </StyleHeader>
  )
}

export default Header