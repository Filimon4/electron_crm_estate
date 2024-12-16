import { Stat, StatGroup } from "@chakra-ui/react"
import React from "react"
import { IStatData } from "../../../shared/types/stat.types"
import StatCard from "./StatCard"

const StatsHeader = ({data}: {data: IStatData[] | null}) => {
  return (
    <StatGroup>
      {data && data?.length > 0 && data.map((stat, i) => (
        <Stat key={i}>
          <StatCard label={stat.label} value={stat.value} text={stat.text} />
        </Stat>
      ))}
    </StatGroup>
  )
}

export default StatsHeader
