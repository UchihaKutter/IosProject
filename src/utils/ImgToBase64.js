import RNFS from 'react-native-fs'

export default function imgToBase64(filePath) {
  return RNFS.readFile(filePath, 'base64')
}
