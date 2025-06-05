export function showImagePreview(inputFile: HTMLInputElement): string | null {
  const file = inputFile.files?.[0]

  if (!file || !file.type.startsWith('image/')) {
    return null
  }

  return URL.createObjectURL(file)
}
