import { TDownloadFile } from "./downloadFile.type"

/**
 * Downloads a file from the given URL with the specified name.
 *
 * @param {string} url - The URL of the file to download
 * @param {string} name - The name to give the downloaded file
 * @param {Object} options - Additional options for the download
 * @param {boolean} options.addDataToName - Whether to add timestamp to the file name
 * @returns {void}
 */
const downloadFile: TDownloadFile = (url, name, options) => {
  const link = document.createElement("a")
  link.href = url

  link.download = `${name}`
  link.target = "_blank"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default downloadFile
