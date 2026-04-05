export type TDownloadFile = (
  url: string,
  name: string,
  options?: {
    addDataToName: boolean
  },
) => void
