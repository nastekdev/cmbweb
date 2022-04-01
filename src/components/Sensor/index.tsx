import { Center, WrapItem } from "@chakra-ui/react";
import { useState } from "react";

interface SensorProps {
  light?: string;
  title?: string;
};

export function Sensor({
  light,
  title,
  ...rest
}: SensorProps) {
  const [lightDesfault, setLightDesfault] = useState('whiteAlpha.500');

  return (
    <>
      <WrapItem>
        <Center
          w='180px'
          h='180px'
          p='10'
          bg={light ? light : lightDesfault}
          fontSize='15'
          fontWeight='extrabold'
          borderRadius='100'
          textAlign='center'
          {...rest}
        >
          {title}
        </Center>
      </WrapItem>
    </>
  );

}
