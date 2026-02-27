export const isImageUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false

  return /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i.test(value)
}

export const isDataUri = (value: unknown): value is string => {
  return typeof value === 'string' && value.startsWith('data:')
}

export const getMimeTypeFromDataUri = (dataUri: string): string => {
  const match = dataUri.match(/^data:([^;,]+)/)
  return match?.[1] ?? ''
}

export const isImageMime = (mime: string): boolean =>
  mime.startsWith('image/')

export const mimeToExtension = (mime: string): string => {
  const map: Record<string, string> = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'text/csv': 'csv',
    'application/zip': 'zip',
    'image/png': 'png',
    'image/jpeg': 'jpg',
  }

  return map[mime] ?? mime.split('/')[1] ?? 'bin'
}


export const downloadDataUri = (dataUri: string, filename: string) => {
  const link = document.createElement('a')
  link.href = dataUri
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const getFileNameFromDataUri = (dataUri: string): string | null => {
  const metadata = dataUri.split(',')[0]
  const match = metadata.match(/name=([^;]+)/)
  return match?.[1] ?? null
}
