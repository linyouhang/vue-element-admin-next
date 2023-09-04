import { defineStore } from "pinia"

const useSettingStroe = defineStore("setting", {
  state() {
    return {
      fold: true,
      refresh: false,
    }
  },
})

export default useSettingStroe
