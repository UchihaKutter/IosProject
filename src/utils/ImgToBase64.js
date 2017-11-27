import RNFS from 'react-native-fs'

export default function imgToBase64(filePath) {
  if (!filePath) {
    console.log('imgToBase64 filePath is null')
    return Promise.reject()
  }
  return RNFS.readFile(filePath, 'base64')
}
