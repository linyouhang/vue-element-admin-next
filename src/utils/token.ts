export const SET_TOKEN = (data: string) => {
  localStorage.setItem("TOKEN", data)
}
export const GET_TOKEN = (): string | undefined => {
  return localStorage.getItem("TOKEN") || undefined
}
export const RM_TOKEN = () => {
  localStorage.removeItem("TOKEN")
}
