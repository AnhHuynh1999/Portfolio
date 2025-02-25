const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,norereferrer')
  if (newWindow) newWindow.opener = null
}

export default openInNewTab
