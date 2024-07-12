import * as React from "react";
import { Appbar } from "react-native-paper";
import { styled } from "nativewind";

const StyledAppbarHeader = styled(Appbar.Header);

const Header = ({ country }) => {
  return (
    <StyledAppbarHeader className="mt-2 bg-black">
      <Appbar.Content title={country} titleStyle={{ color: "white" }} />
    </StyledAppbarHeader>
  );
};

export default Header;
