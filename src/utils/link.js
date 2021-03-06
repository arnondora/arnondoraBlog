export function getFacebookShareLink(link) {
  return 'https://www.facebook.com/sharer/sharer.php?u=' + link
}

export function getTwitterShareLink(link) {
  return 'https://twitter.com/home?status=' + link
}

export function getGooglePlusShareLink(link) {
  return 'https://plus.google.com/share?url=' + link
}

export function getLineShareLink(link) {
  return 'https://social-plugins.line.me/lineit/share?url=' + link
}

export function convertLinkFromSlug(slug) {
  return process.env.APP_URL + slug
}
