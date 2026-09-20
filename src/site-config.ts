function optional(value: string | undefined) {
  return value?.trim() || null
}

function configured(value: string | undefined, fallback: string) {
  return optional(value) ?? fallback
}

export const siteConfig = {
  author: configured(import.meta.env.VITE_SITE_AUTHOR, '刘合翔'),
  authorUrl: configured(import.meta.env.VITE_SITE_AUTHOR_URL, 'https://faculty.hdu.edu.cn/rwys/lhx/main.htm'),
  affiliation: optional(import.meta.env.VITE_SITE_AFFILIATION),
  contactLabel: configured(import.meta.env.VITE_SITE_CONTACT_LABEL, 'lohoso@qq.com'),
  contactUrl: configured(import.meta.env.VITE_SITE_CONTACT_URL, 'mailto:lohoso@qq.com'),
  feedbackUrl: configured(import.meta.env.VITE_SITE_FEEDBACK_URL, 'https://github.com/marslhx/communication-compass/discussions'),
  contentLicense: optional(import.meta.env.VITE_CONTENT_LICENSE),
  codeLicense: optional(import.meta.env.VITE_CODE_LICENSE),
}
