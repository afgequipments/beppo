type UBadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

export function getMethodColor(method: string): UBadgeColor {
  const normalizedMethod = method.toUpperCase()

  switch (normalizedMethod) {
    case 'GET':
      return 'success'
    case 'POST':
      return 'warning'
    case 'PUT':
      return 'info'
    case 'PATCH':
      return 'secondary'
    case 'DELETE':
      return 'error'
    case 'HEAD':
      return 'neutral'
    case 'OPTIONS':
      return 'primary'
    default:
      return 'neutral'
  }
}
