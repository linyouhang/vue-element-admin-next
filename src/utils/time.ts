enum TIME {
  MORNING = "早上",
  NOON = "中午",
  NIGTH = "晚上",
}

export const getTime = (): string => {
  const now = new Date().getHours()
  if (now < 12 && now > 6) {
    return TIME.MORNING
  } else if (now > 12 && now < 17) {
    return TIME.NIGTH
  } else {
    return TIME.NIGTH
  }
}
