import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { HStack, Icon } from "@chakra-ui/react";
import { Discipline } from "../../../entities/Discipline";
import { IconType } from "react-icons";

interface Props {
  disciplines: Discipline[];
}

const DisciplineIconList = ({ disciplines = [] }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  return (
    <HStack marginY={1}>
      {disciplines.map((discipline) => (
        <Icon
          key={discipline.id}
          as={iconMap[discipline.slug]}
          color="gray.500"
        />
      ))}
    </HStack>
  );
};

export default DisciplineIconList;
