import RNFS from 'react-native-fs'

export default function imgToBase64(filePath) {
  if (!filePath) {
    console.error('imgToBase64 filePath is null')
    return
  }
  return RNFS.readFile(filePath, 'base64')
}
