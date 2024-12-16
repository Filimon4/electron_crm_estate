import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react"
import React from "react"
import { IStatData } from "../../../shared/types/stat.types"

const StatCard: React.FunctionComponent<IStatData> = ({label, value, text}) => {
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
      <StatHelpText>{text}</StatHelpText>
    </Stat>
  )
}

export default StatCard
