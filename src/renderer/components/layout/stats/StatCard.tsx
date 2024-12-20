import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react"
import React from "react"
import { IStatData } from "../../../shared/types/stat.types"
import { statLables } from "../../../shared/config/stat.config"

const StatCard: React.FunctionComponent<IStatData> = ({label, value, text}) => {
  return (
    <Stat>
      <StatLabel>{statLables[label]}</StatLabel>
      <StatNumber>{value}</StatNumber>
      <StatHelpText>{text}</StatHelpText>
    </Stat>
  )
}

export default StatCard
