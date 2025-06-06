export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '') // Remove tudo que não for número

  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim()
  }

  return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim()
}
